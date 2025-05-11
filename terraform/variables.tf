variable "project_id" {}
variable "region" {}
variable "cluster_name" {
  default = "voting-prod-cluster"
}
variable "network" {
  default = "default"
}
variable "subnetwork" {
  default = "default"
}
variable "node_count" {
  default = 3
}
variable "machine_type" {
  default = "e2-medium"
}
variable "environment" {
  default = "prod"
}
