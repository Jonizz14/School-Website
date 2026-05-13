from django.db import models


class Teacher(models.Model):
    first_name = models.CharField(max_length=120)
    last_name = models.CharField(max_length=120)
    profession = models.CharField(max_length=255)
    image = models.TextField(blank=True)
    biography = models.TextField(blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=30, blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}".strip()


class Student(models.Model):
    first_name = models.CharField(max_length=120)
    last_name = models.CharField(max_length=120)
    image = models.TextField(blank=True)
    biography = models.TextField(blank=True)
    achievements = models.TextField(blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}".strip()


class News(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    time = models.DateTimeField()
    category = models.IntegerField(default=0)

    def __str__(self):
        return self.title


class NewsImage(models.Model):
    news = models.ForeignKey(News, on_delete=models.CASCADE, related_name="images")
    image = models.TextField()
    is_main = models.BooleanField(default=False)


class Course(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    image = models.TextField(blank=True)
    teacher = models.ForeignKey(
        Teacher,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="courses",
    )

    def __str__(self):
        return self.title


class School(models.Model):
    name = models.CharField(max_length=255)
    number = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True)
    instagram = models.URLField(blank=True)
    telegram = models.URLField(blank=True)
    facebook = models.URLField(blank=True)
    pupils = models.PositiveIntegerField(default=0)
    teachers = models.PositiveIntegerField(default=0)
    finishers = models.PositiveIntegerField(default=0)
    classes = models.PositiveIntegerField(default=0)
    about_image = models.CharField(max_length=500, blank=True)

    def __str__(self):
        return self.name


class Principal(models.Model):
    first_name = models.CharField(max_length=120)
    last_name = models.CharField(max_length=120)
    profession = models.CharField(max_length=255)
    image = models.TextField(blank=True)
    instagram = models.URLField(blank=True)
    telegram = models.URLField(blank=True)
    facebook = models.URLField(blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}".strip()


class Document(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    time = models.DateTimeField()
    image = models.TextField(blank=True)
    file = models.CharField(max_length=500, blank=True)

    def __str__(self):
        return self.title


class DocumentGallery(models.Model):
    document = models.ForeignKey(Document, on_delete=models.CASCADE, related_name="gallery")
    image = models.TextField()


class Event(models.Model):
    topic = models.CharField(max_length=255)
    description = models.TextField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    image = models.TextField(blank=True)

    def __str__(self):
        return self.topic


class Galery(models.Model):
    title = models.CharField(max_length=50, blank=True, null=True)
    description = models.CharField(max_length=150, blank=True, null=True)
    image = models.TextField()

    def __str__(self):
        return self.title or f"Gallery Image {self.id}"


class Contact(models.Model):
    full_name = models.CharField(max_length=255)
    number = models.CharField(max_length=30)
    subject = models.CharField(max_length=255)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} - {self.subject}"
