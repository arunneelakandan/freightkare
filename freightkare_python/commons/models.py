from django.db import models

# Create your models here.
class TblPorts(models.Model):
    id = models.BigIntegerField(primary_key=True)
    port_name = models.CharField(max_length=50)
    country_name = models.CharField(max_length=50)
    port_code = models.CharField(max_length=10)
    url = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tbl_ports'