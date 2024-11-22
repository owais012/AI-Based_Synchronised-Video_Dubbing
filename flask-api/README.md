Steps to run the model pipeline

1. Clone all these repo in the model folder
git clone https://github.com/AI4Bharat/IndicTrans2.git
git clone https://github.com/VarunGumma/IndicTransToolkit.git
git clone https://github.com/justinjohn0306/Wav2Lip

2. Download these pretrained models in the checkpoints folder of wav2lip repo
https://github.com/justinjohn0306/Wav2Lip/releases/download/models/wav2lip.pth
https://github.com/justinjohn0306/Wav2Lip/releases/download/models/wav2lip_gan.pth
https://github.com/justinjohn0306/Wav2Lip/releases/download/models/resnet50.pth
https://github.com/justinjohn0306/Wav2Lip/releases/download/models/mobilenet.pth

3. Run the app.py which will launch a flask server

4. Send a post request with parameters: youtubr url, src_language, target_language, start_time, end_time

5. The result video will be in the results folder of wav2lip