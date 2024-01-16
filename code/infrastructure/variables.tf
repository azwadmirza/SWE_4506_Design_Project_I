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