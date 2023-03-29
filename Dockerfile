FROM python:3.10-slim

WORKDIR /app/

COPY ./python_backend/SuperGlueModels /app/SuperGlueModels
COPY ./python_backend/* /app/
COPY ./requirements.txt /app/
RUN apt-get update
RUN apt-get -y install libgl1-mesa-glx
RUN apt-get -y install libglib2.0-0
RUN pip3 install torch==1.13.1 torchvision==0.14.1 torchaudio --index-url https://download.pytorch.org/whl/cpu
RUN pip3 install fastapi==0.92.0 uvicorn==0.20 python-multipart==0.0.6 matplotlib opencv-python
CMD uvicorn --host=0.0.0.0 --port 8000 main:api
