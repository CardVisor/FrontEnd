#  PayBoard(페이보드)
> **Pay + DashBoard** : 신용카드 결제, 고객 및 혜택 관련 데이터를 다양한 차트 이용으로 대시보드 방식의 분석 및 시각화 서비스

<br/>

# 서비스 대상
> **카드사 직원**
<br/>

# 서비스 목표
> **결제 데이터 기반, 데이터의 군집별 인사이트 제공**
<br/>

# 서비스 특징

**군집별 기능 분류**
- **메인(Main)** : 결제 추이, 사용자 변화, 결제금액 기준 카드 Top5 등<br/>
- **해외결제(International)** : 국가별 결제 내역의 세계 지도화, 상세 내역 조회<br/>
- **고객(Customer)** : 각 그룹별 결제 내역의 정보 조회
  > 커스텀 필터링 기능 : 고객 필터링 후, 주 사용카드 및 소비처 정보 제공<br/>
- **카드(Card)** : 카드별 소비 그래프, 요약 데이터 제공
  > 일대일 카드비교 기능 : 카드별 1대1 비교로 데이터의 직비교 가능 및 소비 차트 제공<br/>
- **혜택(Benefit)** : 결제 적용된 혜택의 사용처 기준 정보 제공
  > 타겟 기반 혜택 추천 기능 : 특정 고객 그룹의 상위 사용 혜택 및 관련 카드 조회, Drag and Drop으로 혜택을 조합하여 연간 혜택 가치 추정 및 기존 카드와 순위 비교<br/>
  > **혜택 가치** : (해당 혜택이 적용된 건수) * (해당 혜택을 포함한 카드의 총 결제 건수) * 혜택률 * 기준 결제 금액
<br/>

# 진행 기간

🗓️ 2024.01 - 2024.02

 <br/>
 

# 함께한 멤버 

<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/seobottttt"><br /><sub><b>서보현</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/
Hwasoo-Jeon"><br /><sub><b>전화수</b></sub></a><br /></td>
      <td align="center"><br /><sub><b>방용수</b></sub></a><br /></td>
      <td align="center"><br /><sub><b>유은경</b></sub></a><br /></td>
     <tr/>
      <td align="center"><br /><sub><b>동지현</b></sub></a><br /></td>
    </tr>
  </tbody>
</table>

 <br/>

# 개발 도구

### 🖥️ BackEnd
<div>
<img alt="Java" src ="https://img.shields.io/badge/Java-0769AD.svg?&style=for-the-badge&logo=Java&logoColor=white"/>
<img alt="SpringBoot" src ="https://img.shields.io/badge/SpringBoot-6DB33F.svg?&style=for-the-badge&logo=SpringBoot&logoColor=white"/>
<img alt="Jpa" src ="https://img.shields.io/badge/hibernate-#59666C.svg?&style=for-the-badge&logo=hibernate&logoColor=white"/>
</div>

### 🖱️ FrontEndReact
<div>
<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>React</title><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/></svg>
<img alt="JavaScript" src ="https://img.shields.io/badge/JavaScriipt-F7DF1E.svg?&style=for-the-badge&logo=JavaScript&logoColor=black"/>
</div>

### 🧱 DataBase & Cloud
<div>
<img alt="microsoftazure" src ="https://img.shields.io/badge/microsoftazure-0078D4.svg?&style=for-the-badge&logo=microsoftazure&logoColor=white"/>
<img alt="amazonrds" src ="https://img.shields.io/badge/amazonrds-527FFF.svg?&style=for-the-badge&logo=amazonrds&logoColor=white"/>
<img alt="amazons3" src ="https://img.shields.io/badge/amazons3-569A31.svg?&style=for-the-badge&logo=amazons3DB&logoColor=white"/>
<img alt="docker" src ="https://img.shields.io/badge/docker-2496ED.svg?&style=for-the-badge&logo=docker&logoColor=white"/>

</div>

### 🚀 Tools
<div>
<img alt="STS" src ="https://img.shields.io/badge/STS-6DB33F.svg?&style=for-the-badge&logo=Spring&logoColor=white"/>
<img alt="visualstudiocode" src ="https://img.shields.io/badge/visualstudiocode-007ACC.svg?&style=for-the-badge&logo=visualstudiocode&logoColor=white"/>
</div>


### 🤝 Collaboration Tools
<div>
<img alt="Slack" src ="https://img.shields.io/badge/Slack-4A154B.svg?&style=for-the-badge&logo=Slack&logoColor=white"/>
<img alt="sourcetree" src ="https://img.shields.io/badge/sourcetree-0052CC.svg?&style=for-the-badge&logo=sourcetree&logoColor=white"/>
<img alt="Github" src ="https://img.shields.io/badge/Github-181717.svg?&style=for-the-badge&logo=Github&logoColor=white"/>
<img alt="Notion" src ="https://img.shields.io/badge/Notion-000000.svg?&style=for-the-badge&logo=Notion&logoColor=white"/>
</div>

 <br/>

 

# 페이지 구성 및 프리뷰


### Main
![main](https://github.com/CardVisor/BackEnd/assets/134925813/9c45830f-6b5e-40b5-be5d-66597af86989)


### International
![international](https://github.com/CardVisor/BackEnd/assets/134925813/11f2ad9f-d5a0-4f28-aa4f-bf3aafe54c92)

 <br/>


### Customer

![customer](https://github.com/CardVisor/BackEnd/assets/134925813/9fb9adc6-1e12-4df5-b7d0-ee352dd6b32e)

![customer_2](https://github.com/CardVisor/BackEnd/assets/134925813/ecf05646-0b81-4669-98e8-b0f52a7a2b8b)

 <br/>


### Card

![card](https://github.com/CardVisor/BackEnd/assets/134925813/9ae1c2d9-f65a-41c2-be2a-8826f0769af8)

![card_2](https://github.com/CardVisor/BackEnd/assets/134925813/e62679db-ff41-4829-81c2-fc28d9cb038f)

 <br/>

 
### Benefit

![benefit](https://github.com/CardVisor/BackEnd/assets/134925813/bbcdbe74-75c7-4d7e-99a5-248041a701f7)

![benefit_2](https://github.com/CardVisor/BackEnd/assets/134925813/f5fc6162-635b-422c-8f04-2620e4b17bbb)

 <br/>
 
 

