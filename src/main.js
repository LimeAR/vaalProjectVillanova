import { bootstrapCameraKit, createMediaStreamSource, Transform2D, } from '@snap/camera-kit';

(async function () {
  const cameraKit = await bootstrapCameraKit({ 
    apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzMwMjAyNzQxLCJzdWIiOiI5ODhmZjlhYS1hOGQxLTQ5YTctYmM2MC04YmVhY2RmMTJlZTN-U1RBR0lOR342ZGJjNmQ1YS04YzM4LTRlYTQtYjRkNi0xNmVhZGM3NGJmN2QifQ.btDcr_U58YBqQGFGFAC8K94OvhL581wBpdrwvWD8Ad4' });

const session = await cameraKit.createSession();

document.getElementById('canvas').replaceWith(session.output.capture);

const lens = await cameraKit.lensRepository.loadLens(
    'fc6e6752-db8f-4be1-87a6-d25c3b8e3dd5',
    'e17036f9-c58c-4204-b18c-6474e9488577'
  );

const mediaStream = await navigator.mediaDevices.getUserMedia({
  video:{
    width: { min: 1024, ideal: 1280, max: 1920 },
    height: { min: 576, ideal: 720, max: 1080 },
    facingMode: { exact: "environment" },
  },
});

const source = createMediaStreamSource(mediaStream, { cameraType: 'environment' 
})

await session.setSource(source);

//source.setRenderSize(window.innerWidth, window.innerHeight)

session.play('capture');

await session.applyLens(lens);


})();