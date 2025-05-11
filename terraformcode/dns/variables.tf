variable "dns_zone" {
  description = "The name of the managed zone"
}

variable "domain_name" {
  description = "The base domain, e.g., devopsmeetsai.site"
}

variable "ingress_ip" {
  description = "External IP of the GKE ingress"
}
