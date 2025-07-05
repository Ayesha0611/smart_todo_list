from django.db import models

class ContextEntry(models.Model):
    SOURCE_CHOICES = [
        ('email', 'Email'),
        ('whatsapp', 'WhatsApp'),
        ('note', 'Note'),
    ]

    content = models.TextField()
    source = models.CharField(max_length=50, choices=SOURCE_CHOICES)
    timestamp = models.DateTimeField(auto_now_add=True)
    insights = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.source} - {self.timestamp.strftime('%Y-%m-%d')}"
