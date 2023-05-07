# 💡 ON&OFF

## 🌟 INTRODUCE

웹 기반 출퇴근 기록 서비스.  
근태관리 솔루션 Shiftee 클론 사이드 프로젝트로 HTML5에서 등장한 geolocation, 곳곳에서 사용하는 공통 컴포넌트, 전역 상태 관리를 위한 Recoil, 프로젝트 시 프론트엔드와 백엔드 일정 우선순위 조율 등 다양한 기능과 협업에 익숙해지고자 시작하였습니다.

<br />

## ✨ TOOL

Stack  
[![My Skills](https://skillicons.dev/icons?i=html,js,react,nextjs,ts,css,emotion,apollo,git)](https://skillicons.dev)

Deploy  
[![My Skills](https://skillicons.dev/icons?i=gcp,docker)](https://skillicons.dev)

Communication  
[![My Skills](https://skillicons.dev/icons?i=github,discord)](https://skillicons.dev)

<br />

## ⏰ PERIOD

2022년 11월 28일 ~ 2023년 02월 01일

<br />

## 👥 MEMBER

김민겸, 신미연, 이다은, 이상현, 이정우, 홍민우

<br />

## 🎥 DEMO

|페이지|영상|
|:---:|---|
|레이아웃|<img src="https://user-images.githubusercontent.com/110293289/236621994-4e61df5c-4b54-4a92-be70-67fbde5bcf0d.gif"/>|
|휴가 관리 <br /> 추가|<img src="https://user-images.githubusercontent.com/110293289/236622054-63c3adcc-2c50-482b-b84f-a5f2d53ed4d9.gif"/>|
|휴가 관리 <br /> 단일 수정 / 전체 삭제|<img src="https://user-images.githubusercontent.com/110293289/236622071-822d1d9c-f97f-43cc-b300-e7256032e803.gif"/>|
|휴가 발생 <br /> 추가|<img src="https://user-images.githubusercontent.com/110293289/236622167-af3e59fd-e783-4e4a-b349-14e5c7fd6965.gif"/>|
|휴가 발생 <br /> 단일 수정 / 단일 삭제|<img src="https://user-images.githubusercontent.com/110293289/236622199-899e95c8-f00d-455f-b966-4c51ed981dfb.gif"/>|
|휴가 발생 <br /> 선택 삭제|<img src="https://user-images.githubusercontent.com/110293289/236622225-877d201a-db41-400c-8c3e-7b3198df4f84.gif"/>|

## 🔥 위기와 극복방법

- 라이브러리 사용 없이 사이드바 반응형 조절
  
  관리자페이지의 레이아웃을 구현할 때, 반응형에 따라 사이드바의 크기를 조정해줘야하는 일이 생겼고, 이를 위해 resize를 사용하였습니다. resize를 적용시킬 수 있는 방법에는 두가지가 있었는데, resize-observer이라는 라이브러리를 사용하는 것과 js문법으로 resize 이벤트를 발생시키는 것이었습니다. 모든 사이즈를 감지하는 것이 아닌 특정사이즈만 감지하면 됐기 때문에 라이브러리를 설치하여 메모리를 늘리기보다는 js문법을 사용하여 특정사이즈를 state에 담아 상황에 따라 사용하였습니다.

- react-hook-form과 antd 동시에 사용하기
  
  react-hook-form은 기본적으로 비제어 컴포넌트 방식으로 폼에 접근을 하지만 antd와 같이 제어 컴포넌트를 다루게 될 때에는 제어 요소 자체를 다루는 방법을 사용해야 했습니다. 그렇기 때문에 라이브러리 자체에서 제공하는 controller라는 속성을 사용하였고, 이를 통해 antd를 함께 다루는 방법을 배울 수 있었습니다. antd와 react-hook-form을 동시에 다루면서 발생하던 문제는 이전 프로젝트를 하면서도 어려움을 겪었던 부분이였는데, 이번 프로젝트를 통해 적용시키는 방법을 알게되었습니다.

<br />

## 🌊 회고

팀장이라는 직책을 맡으며 프론트엔드와 백엔드간의 소통을 담당하였으며, 이슈 스레드를 만들어 생기는 이슈를 다음날에 회의를 통해 해결 방안을 찾았습니다. 또한 사이드 프로젝트로 진행하는 것이다 보니 팀원들의 스케줄 관리가 필요하였고, 각자 스케줄에 맞는 스프린트를 업데이트 하였습니다. 그리고 한 페이지 안에 존재하는 여러가지 필터들을 관리하고, 공통 컴포넌트를 만들고 사용할 수 있는 좋은 기회였습니다. 

처음에 프로젝트를 시작할 때는 테스트 코드도 함께 작성해 보자는 것이 목표였는데, 생각보다 구현해야 할 페이지가 많아서 시도하지 못했습니다. 다음 프로젝트 때에는 목표를 구체화하고 스프린트를 세분화하여 작성하여 테스트 코드를 작성해보는 것을 목표로 하고 있습니다.
