FROM python:3.10
  
WORKDIR /app/

COPY ./python_backend/SuperGlueModels /app/SuperGlueModels
COPY ./python_backend/* /app/
COPY ./requirements.txt /app/

RUN pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu
RUN pip3 install fastapi==0.92.0 uvicorn==0.20 python-multipart==0.0.6
CMD uvicorn --host=0.0.0.0 --port 8000 main:api
