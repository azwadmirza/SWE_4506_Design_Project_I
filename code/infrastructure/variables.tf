variable "gcp_project_id" {
  type = string
  description = "Google Cloud project ID"
}
variable "gcp_credentials" {
  type = string
  sensitive = false
  description = "Google Cloud service account credentials"
}

variable "gcp_region" {
  type = string
  description = "Google Cloud region"
}

variable "gcp_zone" {
  type = string
  description = "Google Cloud zone"
}

variable "pool_name" {
  type = string
  description = "WIF Pool Name"
}


variable "service_account_id" {
  type = string
  description = "New Service Account for WIF User"
}