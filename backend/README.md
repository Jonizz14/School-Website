# Django Backend (School Website)

Bu backend frontenddagi barcha ma'lumotlar uchun to'liq CRUD API beradi:
- `GET` (list/detail)
- `POST`
- `PATCH`
- `DELETE`

## 1) Ishga tushirish

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_data
python manage.py createsuperuser
python manage.py runserver
```

Admin panel: `http://127.0.0.1:8000/admin/`

## 2) Frontend uchun API URL

Frontend `.env` faylida:

```env
VITE_REACT_APP_API_URL=http://127.0.0.1:8000
```

## 3) Endpointlar

- `/teachers/`
- `/students/`
- `/news/`
- `/course/`
- `/school/`
- `/principal/`
- `/document/`
- `/event/`
- `/galery/`
- `/contact/`

Har bir endpoint `GET/POST/PATCH/DELETE` ni qo'llaydi.

## 4) Muhim eslatma

Frontenddagi ba'zi joylarda `/news` yoki `/document` oxirida `/`siz chaqirilgan. Django `APPEND_SLASH` orqali buni avtomatik to'g'rilaydi.
