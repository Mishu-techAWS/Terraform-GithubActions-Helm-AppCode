# terraform/dns/main.tf
resource "google_dns_record_set" "frontend_ingress" {
  name         = "www.${var.domain_name}."
  type         = "A"
  ttl          = 300
  managed_zone = var.dns_zone

  rrdatas = [var.ingress_ip]
}
