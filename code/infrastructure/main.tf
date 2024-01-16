module "github-actions-runners" {
  source  = "terraform-google-modules/github-actions-runners/google"
  version = "3.1.2"
}

provider "google" {
  project = var.gcp_project_id
  credentials = var.gcp_credentials
  region = var.gcp_region
  zone = var.gcp_zone
}
provider "google-beta" {
  project = var.gcp_project_id
  credentials = var.gcp_credentials
  region = var.gcp_region
  zone = var.gcp_zone
}


resource "google_service_account" "sa" {
  project    = var.gcp_project_id
  account_id = var.service_account_id
}

resource "google_artifact_registry_repository" "datanalytica-repo" {
  location      = "us-west1"
  repository_id = var.repository_id
  description   = "Data Analytica Repository"
  format        = "DOCKER"
}

resource "google_project_iam_member" "default" {
  project = var.gcp_project_id
  for_each = toset([
    "roles/storage.admin",
    "roles/iam.workloadIdentityUser",
    "roles/compute.viewer",
    "roles/artifactregistry.writer",
    "roles/run.admin",
    "roles/iam.serviceAccountUser"
  ])
  role = each.key
  member  = "serviceAccount:${google_service_account.sa.email}"
}

module "oidc" {
  source      = "./.terraform/modules/github-actions-runners/modules/gh-oidc"
  project_id  = var.gcp_project_id
  pool_id     = "${var.pool_name}-pool"
  provider_id = "${var.pool_name}-provider"
  sa_mapping = {
    (google_service_account.sa.account_id) = {
      sa_name   = google_service_account.sa.name
      attribute = "attribute.repository/${var.repo_name}"
    }
  }
}

resource "random_id" "bucket_prefix" {
  byte_length = 8
}

resource "google_kms_key_ring" "keyring" {
  name     = "datanalytica-key-ring"
  location = var.gcp_region
}

resource "google_kms_crypto_key" "terraform_state_bucket" {
  name            = "terraform_state_bucket"
  key_ring        = google_kms_key_ring.keyring.id
  rotation_period = "100000s"

  lifecycle {
    prevent_destroy = false
  }
}

data "google_storage_project_service_account" "gcs_account" {
}

resource "google_kms_crypto_key_iam_binding" "binding" {
  crypto_key_id = google_kms_crypto_key.terraform_state_bucket.id
  role          = "roles/cloudkms.cryptoKeyEncrypterDecrypter"

  members = ["serviceAccount:${data.google_storage_project_service_account.gcs_account.email_address}"]
}

resource "google_storage_bucket" "default" {
  name          = "${random_id.bucket_prefix.hex}-bucket-tfstate"
  force_destroy = false
  location      = var.gcp_region
  storage_class = "STANDARD"
  versioning {
    enabled = true
  }
  encryption {
    default_kms_key_name = google_kms_crypto_key.terraform_state_bucket.id
  }

  depends_on = [
    google_project_iam_member.default,
    google_kms_crypto_key_iam_binding.binding
  ]
}

terraform {
 backend "gcs" {
   bucket  = "datanalytica69_bucket"
   prefix  = "terraform/state"
 }
}