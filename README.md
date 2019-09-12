# Sketch ML: A mobile prototyping tool using Deep Learning.
This is my Final Year Project as part of TUD Computer Science:

Writing front-end code can be time-consuming. The objective of this Project is to transform mobile hand-drawn wireframes from a picture into digital layouts and front-end code that can be used as a starting point for mobile applications development. SketchML is a solution developed using React Native and powered by an Artificial intelligence model that has been trained to recognise multiple user interface elements such as buttons, text box and images.

Users can create projects and upload images through the mobile application. A computer vision model predicts what UI elements are present in the image and their location. A layout algorithm uses the spatial information from all the bounding boxes of the predicted elements to generate a grid structure that accommodates all. All these pieces of information are used to generate React Native code reflecting the result.


[![Video](http://img.youtube.com/vi/cl_jWwF0LNk&t=12s/0.jpg)](https://www.youtube.com/watch?v=cl_jWwF0LNk&t=12s&feature=youtu.be)

## Project structure:
- app: This folder contains the mobile application developed in React Native using Expo.
- firebase: This folder contains the Cloud Function that was deployed to Google Cloud, node modules and the code generation     algorithm.
- model: This folder contains the files required to train the ML network, the custom dataset and the pre-trained model checkpoints. Faster RCNN Inception V2 is the Deep Learning network that was fined-tune using Transfer Learning. 
- sketchML.apk: This is the final version of the app (for now) created for Android. It can be dowloaded and install in your device. Hope you like it!
## Code Overview
### Model
- setup.sh : This is a bash file to point to the TensorFlow API. It initialise the system paths for Python. TensorFlow Object Detection API can be found [here](https://github.com/tensorflow/models/tree/master/research/object_detection).

- rename_resize_images.py: Script required to enumarate and resize the images contained in SketchML/training_images.

- createTFrecords.py : Script necessary to prepare the data for the machine learning model. TensorFlow requires an special format called TF records. This script has been created according to TensorFlow's documentation and following an online tutorial that can be found in the references area of this readme file. 

- createTFrecords.ipynb: This script is the same as the described above but it has been saved to Jupyter notebooks. Github allows you to display its results by clicking on it.

- run.py: This script runs the trained model against the testing images contained in SketchML/test_images.

The following files are provided by TensorFlow and have been used to train, evaluate and produce a working model to detect UI components:

- train.py: Script that trains the model once data is in the according format that TensorFlow requires. It uses 80% of the data contained in the dataset.

- eval.py: This script evaluates the accuracy as the model is trained with 20% of the data that has been previosly split in createTFrecords.py.

- export_inference_graph.py: This script is excecuted once the has been trained. It generates a frozen graph which essentially is the checkpoint saved during the training process. They are used to test data againt the model.

Inside SketchML folder the following files are found:
- training_images: It contains about 330 images of UI sketches from Microsoft. The developer of this prototype has manually labelled 5 types components for every image. This folder also contains the images annotations (XML files).
- training_data: This folder contains training and validation CSV files generated by the developer running the script createTFrecords.py
- records: This folder contains training and validation TF records as described previously generated by the developer running the script createTFrecords.py
-test_images: It contains 20 images that the model hasn't seen before. They are used to test the model predictions.
- experiments: This folder contains the checkpoints of the trained model, the exported graph and the evaluation data used by TensorFlow. Training and evaluation data can be displayed using TensorBoard. A dashboard used to analyse the training process.

### React Native App

This folder contains the source code for the mobile application that can be compiled for Android and iOS. This folder is divided into subfolders that contains node modules, components, icons and the activities of the app.

### Firebase (Cloud Function)

Within this folder you can find the Cloud Function that was deployed on GCP. It was developed in Nodejs. This file works as the connection between the deployed model on ML engine and the mobile application.

## References:
The follwing links are references and online videos that have been used for the understanding and creation of this prototype:

- What is TensorFlow object Detection API?
  https://www.edureka.co/blog/tensorflow-object-detection-tutorial/
  
- How To Train an Object Detection Classifier Using TensorFlow 1.5 (GPU) on Windows 10
  https://www.youtube.com/watch?v=Rgpfk6eYxJA
  
- Object classification problem: raccoon detector with small dataset.
  https://towardsdatascience.com/how-to-train-your-own-object-detector-with-tensorflows-object-detector-api-bec72ecfe1d9
  
- Tensorflow Object Detection API Documentation
  https://github.com/tensorflow/models/tree/master/research/object_detection
