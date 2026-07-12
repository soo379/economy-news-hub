# AI 마케팅 분야 글로벌 RSS 피드 모음

## 1. AI/LLM 뉴스 (광범위)

| 출처 | RSS URL | 특징 |
|------|---------|------|
| **Hacker News** | https://news.ycombinator.com/rss | AI/스타트업 기술 뉴스, 초기 트렌드 감지 |
| **Product Hunt** | https://www.producthunt.com/feed.xml | AI 툴/프로덕트 론칭, 사용자 반응 |
| **The Verge (AI)** | https://www.theverge.com/rss/index.xml | AI 정책, 업계 뉴스, 대중적 시각 |
| **MIT Technology Review** | https://www.technologyreview.com/feed/ | AI 연구, 기술 인사이트 |

---

## 2. AI 마케팅 & 비즈니스 (직접 관련)

| 출처 | RSS URL | 특징 |
|------|---------|------|
| **Marketing AI** | https://feeds.marketing-ai.com/rss | AI 마케팅 도구, 캠페인 사례 |
| **Martech Brew** | https://feeds.readgrowth.com/martech-brew | 마케팅 기술 트렌드 |
| **Indie Hackers** | https://www.indiehackers.com/feed.xml | 스타트업 수익화, 제품 마케팅 전략 |
| **Petal** | https://www.petal.com/rss/ | AI 마케팅 도구 소개 및 비교 |

---

## 3. AI 비즈니스 & 스타트업

| 출처 | RSS URL | 특징 |
|------|---------|------|
| **TechCrunch** | https://techcrunch.com/feed/ | AI 스타트업 펀딩, 제품 출시 |
| **Stratechery** | https://stratechery.com/feed/ | AI 기업 전략 분석 (유료 구독 추천) |
| **The Information** | https://feeds.theinformation.com/the-information | AI 회사 내부 뉴스 (유료) |
| **VentureBeat** | https://venturebeat.com/feed/ | AI/ML 투자, 기술 혁신 |

---

## 4. 한국 AI 뉴스

| 출처 | RSS URL | 특징 |
|------|---------|------|
| **AI타임스** | https://www.aitimes.kr/feed | 한국 AI 정책, 업계 뉴스 |
| **데이터넷** | https://www.datanet.co.kr/feed.xml | 데이터/AI 기술 뉴스 |
| **쿠팡, 배달의민족 기술 블로그** | - | 실무 AI 적용 사례 (블로그 구독) |
| **Brunch (스타트업 채널)** | https://api.brunch.co.kr/ | 한국 스타트업 마케팅 사례 |

---

## 5. AI 콘텐츠 생성 & 마케팅 도구

| 출처 | RSS URL | 특징 |
|------|---------|------|
| **OpenAI Blog** | https://openai.com/feed.xml | ChatGPT, API 업데이트 |
| **Anthropic** | https://www.anthropic.com/feed.xml | Claude 모델 업데이트 (회장님 관심사) |
| **Google AI Blog** | https://ai.googleblog.com/feeds/posts/default | Gemini, PaLM 업데이트 |
| **DeepLearning.AI** | https://www.deeplearning.ai/ | AI 튜토리얼, 뉴스레터 |

---

## 6. 동영상 & 쇼츠 마케팅 (Commerce Radar 연관)

| 출처 | RSS URL | 특징 |
|------|---------|------|
| **YouTube Creator News** | https://www.youtube.com/creators_news/feed | 크리에이터 수익화, 알고리즘 |
| **Social Media Today** | https://www.socialmediatoday.com/feed | SNS 마케팅 트렌드 |
| **Short Form Video News** | - | TikTok/Shorts 마케팅 사례 (뉴스레터) |

---

## RSS 수집 아키텍처 옵션

### 옵션 1️⃣ Prototype (빠른 구축)
```
RSS Feed List → Node.js + node-feed 파싱 
→ JSON 정제 → Firebase Firestore 저장 
→ Next.js 화면 표시
```
**비용**: ~$5/월 (Firebase Free Tier)
**시간**: 1–2일
**관리**: 수동 피드 추가, 중복 제거 수동

### 옵션 2️⃣ Production (안정적 운영)
```
RSS Aggregator (Feedly/Pocket API) 
→ Claude API (분류/요약) 
→ PostgreSQL (Supabase) 
→ Next.js + Vercel
```
**비용**: ~$20–50/월 (API 사용료 포함)
**확장성**: 자동 분류, 중복 제거, 댓글/반응 추적
**관리**: CloudWatch 모니터링, 에러 알람

### 옵션 3️⃣ AI-Native (권장)
```
RSS 피드 → Anthropic Batch API (저비용 처리)
→ Claude로 카테고리/요약/감정분석
→ Notion MCP + Database 동기화
→ 공개 Dashboard (Vercel)
```
**이점**: Batch API로 비용 50–70% 절감, Notion 네이티브 관리

---

## 피드 관리 팁

1. **중복 제거**: 동일 뉴스가 여러 출처에서 나옴 → URL 기반 해싱
2. **분류**: Claude API로 카테고리 (마케팅/제품/투자/정책) 자동 분류
3. **우선순위**: Hacker News 점수(>100), TechCrunch 로고 감지 → 상위 노출
4. **업데이트 빈도**: 큰 출처(TechCrunch) 2시간, 블로그 6시간 주기 체크
5. **모니터링**: CloudWatch 알람 설정 (RSS 파싱 실패 시 Slack 알림)

---

## 추가 리소스

- **Feedly** (유료): RSS 자동 분류, 팀 협업
- **Zapier + Gmail**: RSS → 이메일 다이제스트 자동화
- **n8n** (Self-hosted): 오픈소스 자동화, 완전 제어
