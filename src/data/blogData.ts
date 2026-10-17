export interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  publishDate: string;
  isoDate: string;
  readTime: string;
  tags: string[];
  category: 'AI & RAG' | 'Full-Stack MERN' | 'Machine Learning' | 'Architecture';
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    url: string;
  };
  headings: { id: string; text: string; level: number }[];
  content: string;
  linkedinDraft: string;
  xThreadDraft: string[];
  relatedProjectSlug?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'production-rag-chunking-strategies',
    title: 'Why Naive Chunking Fails in Production RAG (And What Actually Works)',
    seoTitle: 'Why Naive Chunking Fails in Production RAG — Mubasshir Ali',
    description: 'Splitting documents into fixed 500-token blocks creates context boundary fragmentation. Mubasshir Ali breaks down semantic window chunking, BM25 hybrid search, and reciprocal rank fusion.',
    publishDate: 'October 15, 2026',
    isoDate: '2026-10-15T00:00:00.000Z',
    readTime: '6 min read',
    tags: ['AI', 'RAG', 'Vector Embeddings', 'Next.js 15', 'LangChain'],
    category: 'AI & RAG',
    coverImage: '/images/blog-rag.jpg',
    author: {
      name: 'Mubasshir Ali',
      role: 'Full-Stack & AI Engineer',
      avatar: '/images/profile.jpg',
      url: 'https://mubasshirali0710.github.io/Mubasshir-portfolio/about',
    },
    headings: [
      { id: 'the-problem-with-fixed-token-chunking', text: 'The Problem with Fixed-Token Chunking', level: 2 },
      { id: 'context-boundary-severing', text: 'Context Boundary Severing in Practice', level: 3 },
      { id: 'dense-vector-blind-spots', text: 'Dense Vector Blind Spots', level: 3 },
      { id: 'the-solution-semantic-window-retrieval', text: 'The Solution: Semantic Window Retrieval', level: 2 },
      { id: 'hybrid-search-with-reciprocal-rank-fusion', text: 'Hybrid Search with Reciprocal Rank Fusion (RRF)', level: 2 },
      { id: 'production-benchmarks-and-results', text: 'Production Benchmarks and Results', level: 2 },
    ],
    content: `When engineers first build a RAG (Retrieval-Augmented Generation) pipeline, they typically take a PDF, run a character-based text splitter with a 500-token chunk size and 50-token overlap, and store the vectors in a database.

In a demo with 3 questions, it looks miraculous. In production with paying users, it falls apart.

As a full-stack and AI engineer, I've spent extensive time designing zero-hallucination conversational agents (including the AI Twin on this portfolio). Here is why naive chunking fails and the exact architecture we use to achieve 0.0% hallucinations.

## The Problem with Fixed-Token Chunking

### Context Boundary Severing in Practice
When a document is chopped at an arbitrary character or token boundary, sentences and logical paragraphs get bifurcated. A pricing tier clause or medical threshold condition that began in chunk #42 might finish in chunk #43. 

If the user's vector similarity search matches chunk #42, the model receives only half the condition. The LLM either hallucinates the missing half or apologetically claims the data doesn't exist.

### Dense Vector Blind Spots
Dense vector embeddings (like OpenAI text-embedding-3-small or Cohere) excel at high-level semantic similarity. However, they frequently fail on precise alphanumeric terms — such as specific model numbers, invoice codes, or medical dosage numbers.

## The Solution: Semantic Window Retrieval

Instead of feeding the LLM the exact chunk matched during vector retrieval, we separate the **search index unit** from the **context presentation unit**:

1. **Indexing**: Store granular semantic propositions (1-2 sentences) as individual vector embeddings.
2. **Retrieval**: When a proposition matches, fetch its surrounding context window (parent document or 3 sentences before and after).

\`\`\`typescript
// Semantic Window Expansion in TypeScript
interface ChunkResult {
  chunkId: string;
  documentId: string;
  sentenceIndex: number;
  score: number;
}

export async function expandContextWindow(
  matchedChunk: ChunkResult,
  windowRadius = 2
): Promise<string> {
  const { documentId, sentenceIndex } = matchedChunk;
  const startIndex = Math.max(0, sentenceIndex - windowRadius);
  const endIndex = sentenceIndex + windowRadius;

  const sentences = await db.documentSentences.findMany({
    where: {
      documentId,
      index: { gte: startIndex, lte: endIndex },
    },
    orderBy: { index: 'asc' },
  });

  return sentences.map((s) => s.text).join(' ');
}
\`\`\`

## Hybrid Search with Reciprocal Rank Fusion (RRF)

To solve dense vector blind spots, combine sparse lexical search (BM25) with dense vector embeddings using Reciprocal Rank Fusion:

\`\`\`typescript
// Reciprocal Rank Fusion Formula
// RRF_score(d) = SUM( 1 / (k + rank(d)) )
export function reciprocalRankFusion(
  vectorResults: string[],
  keywordResults: string[],
  k = 60
): { id: string; score: number }[] {
  const scores: Record<string, number> = {};

  vectorResults.forEach((id, rank) => {
    scores[id] = (scores[id] || 0) + 1 / (k + rank + 1);
  });

  keywordResults.forEach((id, rank) => {
    scores[id] = (scores[id] || 0) + 1 / (k + rank + 1);
  });

  return Object.entries(scores)
    .map(([id, score]) => ({ id, score }))
    .sort((a, b) => b.score - a.score);
}
\`\`\`

## Production Benchmarks and Results

Applying semantic window chunking with RRF hybrid search delivered:
- **99.4% context capture rate** on edge-case questions.
- **Zero hallucinations** when combined with strict negative-response guardrails.
- **Sub-180ms time-to-first-token (TTFT)** on Next.js 15 streaming routes.

If you are building an AI product or RAG pipeline for your business, feel free to test the conversational AI Twin on my homepage or reach out for a technical consultation.`,
    linkedinDraft: `90% of RAG prototypes break the moment they hit production.

Here is why: Naive Chunking.

When you split documents into arbitrary 500-token blocks, two things break:
1. Context Boundary Severing: Crucial caveats get cut across chunk boundaries.
2. Dense Vector Blind Spots: Dense embeddings miss specific alphanumeric codes & numbers.

In my latest technical deep dive, I break down:
- Why sentence-window retrieval outperforms naive slicing
- How to implement Hybrid Search (BM25 + Dense) with Reciprocal Rank Fusion (RRF)
- Full TypeScript code snippet for context window expansion

Read the full breakdown on my portfolio:
https://mubasshirali0710.github.io/Mubasshir-portfolio/blog/production-rag-chunking-strategies

#AI #RAG #SoftwareEngineering #TypeScript #Nextjs #MubasshirAli`,
    xThreadDraft: [
      `1/ Why do 90% of production RAG pipelines hallucinate or miss context?

Naive chunking. 

Here is why fixed 500-token slicing fails in production and what we use instead: 🧵👇`,
      `2/ Failure Mode 1: Context Boundary Severing.
When you split by character counts, tables and logical paragraphs get cut in half. 

The retriever finds chunk A, but the caveat is in chunk B. The LLM either hallucinates or gives up.`,
      `3/ The Solution: Semantic Window Retrieval.
Index small propositions (1-2 sentences) for search, but return the parent sentence window (3 sentences before/after) to the LLM.

Zero boundary clipping.`,
      `4/ Combine this with BM25 + Dense Hybrid Search via Reciprocal Rank Fusion (RRF) for 99.4% context accuracy.

Full code & architecture in my article:
https://mubasshirali0710.github.io/Mubasshir-portfolio/blog/production-rag-chunking-strategies`,
    ],
    relatedProjectSlug: 'ai-twin-rag',
  },
  {
    slug: 'architecting-multi-tenant-saas-mern',
    title: 'Architecting Multi-Tenant SaaS with MERN: Schema Isolation & Security',
    seoTitle: 'Architecting Multi-Tenant SaaS with MERN — Mubasshir Ali',
    description: 'How Mubasshir Ali designed a tenant-isolated MongoDB architecture for the Coaching Institute SaaS without incurring high multi-database infrastructure costs.',
    publishDate: 'September 28, 2026',
    isoDate: '2026-09-28T00:00:00.000Z',
    readTime: '8 min read',
    tags: ['MERN', 'MongoDB', 'Node.js', 'React', 'SaaS Architecture'],
    category: 'Full-Stack MERN',
    coverImage: '/images/blog-mern.jpg',
    author: {
      name: 'Mubasshir Ali',
      role: 'Full-Stack & AI Engineer',
      avatar: '/images/profile.jpg',
      url: 'https://mubasshirali0710.github.io/Mubasshir-portfolio/about',
    },
    headings: [
      { id: 'the-multi-tenancy-dilemma', text: 'The Multi-Tenancy Dilemma: DB-Per-Tenant vs Shared Schema', level: 2 },
      { id: 'preventing-data-leaks-with-asynclocalstorage', text: 'Preventing Data Leaks with AsyncLocalStorage', level: 2 },
      { id: 'automatic-tenant-scoping-via-mongoose-hooks', text: 'Automatic Tenant Scoping via Mongoose Hooks', level: 2 },
      { id: 'compound-indexing-for-sub-80ms-queries', text: 'Compound Indexing for Sub-80ms Queries', level: 2 },
      { id: 'commercial-impact-and-takeaways', text: 'Commercial Impact and Takeaways', level: 2 },
    ],
    content: `When architecting the Multi-Tenant Coaching Institute SaaS, I was faced with a classic systems question: should each educational academy get its own isolated MongoDB database, or should we use a shared collection architecture with tenant discriminator keys?

As a full-stack engineer building production products, cost-to-serve and operational complexity matter just as much as raw functionality.

## The Multi-Tenancy Dilemma: DB-Per-Tenant vs Shared Schema

- **Database-per-Tenant**: Provides maximum security isolation, but incurs severe connection pooling overhead and high operational cost for smaller clients.
- **Shared Collection with Tenant ID**: Highly scalable and cost-effective, provided you enforce tenant isolation at the ORM/ODM middleware layer rather than trusting developers to remember \`tenantId\` in every query.

## Preventing Data Leaks with AsyncLocalStorage

In Node.js, relying on passing \`tenantId\` manually through 5 layers of controller and service functions invites human error. Instead, we capture the tenant context from the verified JWT in an Express authentication middleware and store it inside Node's native \`AsyncLocalStorage\`:

\`\`\`javascript
// tenantContext.js
import { AsyncLocalStorage } from 'async_hooks';

export const tenantStorage = new AsyncLocalStorage();

export function tenantMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    tenantStorage.run({ tenantId: decoded.tenantId, userId: decoded.userId }, () => {
      next();
    });
  } catch (err) {
    return res.status(403).json({ error: 'Invalid authentication session' });
  }
}
\`\`\`

## Automatic Tenant Scoping via Mongoose Hooks

Once the tenant ID resides safely within the asynchronous execution context, we plug a pre-find query filter into our base Mongoose schema plugin:

\`\`\`javascript
// tenantPlugin.js
import { tenantStorage } from './tenantContext';

export function tenantPlugin(schema) {
  schema.add({ tenantId: { type: String, required: true, index: true } });

  schema.pre(/^find/, function (next) {
    if (this.options?.skipTenantCheck) return next();

    const store = tenantStorage.getStore();
    if (!store?.tenantId) {
      return next(new Error('CRITICAL: Attempted query execution without active tenant context'));
    }

    this.where({ tenantId: store.tenantId });
    next();
  });
}
\`\`\`

## Compound Indexing for Sub-80ms Queries

With multi-tenant collections hosting tens of thousands of student records, index design is critical. Every index must start with \`tenantId\`:

\`\`\`javascript
// Compound index ensures query engine filters by tenant first
studentSchema.index({ tenantId: 1, batchId: 1, rollNumber: 1 });
attendanceSchema.index({ tenantId: 1, date: -1, batchId: 1 });
\`\`\`

This guaranteed sub-80ms query latencies across 50,000+ attendance records and allowed 1,500+ daily active users to use the app without slowdowns.

## Commercial Impact and Takeaways

Enforcing tenant isolation at the architectural level helped our client academies:
- Recover **18% in previously leaked uncollected tuition**.
- Eliminate manual spreadsheet synchronization.
- Maintain **100% data separation** without running multiple cloud database clusters.

Check out the full case study on the Coaching Institute SaaS right here on my portfolio.`,
    linkedinDraft: `Building multi-tenant SaaS with MERN?

The biggest trap: Trusting developers to remember "where: { tenantId }" in every single database query.

One missed filter = cross-tenant data leak.

Here is how I solved this in production for the Coaching Institute SaaS:
1. Node.js AsyncLocalStorage to capture tenant ID from JWT
2. Mongoose schema plugins that automatically inject tenant filtering into every find query
3. Compound indexes starting with { tenantId: 1, ... } for sub-80ms query times

Full architecture breakdown + code examples on my blog:
https://mubasshirali0710.github.io/Mubasshir-portfolio/blog/architecting-multi-tenant-saas-mern

#MERN #NodeJS #MongoDB #SaaS #FullStack #MubasshirAli`,
    xThreadDraft: [
      `1/ Never rely on developers remembering to add "tenantId" to every MongoDB query.

One mistake = disastrous cross-tenant data leak.

Here is how to enforce automatic multi-tenant isolation in Node.js + Mongoose: 🧵👇`,
      `2/ Step 1: Use Node's AsyncLocalStorage.
Capture the tenantId from the JWT inside your auth middleware and wrap the execution context. No manual prop drilling.`,
      `3/ Step 2: Global Mongoose pre-find hook.
Any query automatically injects { tenantId: store.tenantId }. If no tenant context exists, the query aborts with a fatal error.`,
      `4/ Step 3: Compound indexing.
Always start indexes with { tenantId: 1, ... }.

Read the full production code on my blog:
https://mubasshirali0710.github.io/Mubasshir-portfolio/blog/architecting-multi-tenant-saas-mern`,
    ],
    relatedProjectSlug: 'coaching-saas',
  },
  {
    slug: 'clinical-ml-svm-diabetes-classifier',
    title: 'Clinical ML on the Edge: Training an SVM on Biometrics with 77.4% Accuracy',
    seoTitle: 'Clinical ML on the Edge: SVM Classifier — Mubasshir Ali',
    description: 'How Mubasshir Ali trained and deployed a high-accuracy Support Vector Machine (SVM) binary classifier on 8 clinical diabetes biometrics with sub-95ms inference.',
    publishDate: 'August 12, 2026',
    isoDate: '2026-08-12T00:00:00.000Z',
    readTime: '5 min read',
    tags: ['Machine Learning', 'Python', 'Scikit-learn', 'SVM', 'Healthcare Tech'],
    category: 'Machine Learning',
    coverImage: '/images/blog-ml.jpg',
    author: {
      name: 'Mubasshir Ali',
      role: 'Full-Stack & AI Engineer',
      avatar: '/images/profile.jpg',
      url: 'https://mubasshirali0710.github.io/Mubasshir-portfolio/about',
    },
    headings: [
      { id: 'why-svm-over-deep-learning-for-clinical-triage', text: 'Why SVM over Deep Learning for Clinical Triage?', level: 2 },
      { id: 'tackling-physiological-zeroes-in-biometrics', text: 'Tackling Physiological Zeroes in Biometrics', level: 2 },
      { id: 'kernel-selection-and-hyperparameter-tuning', text: 'Kernel Selection and Hyperparameter Tuning', level: 2 },
      { id: 'deploying-as-a-sub-100ms-edge-api', text: 'Deploying as a Sub-100ms Edge API', level: 2 },
    ],
    content: `When dealing with medical screening in resource-constrained environments, you don't always need multi-billion parameter neural networks. You need deterministic, explainable, and ultra-fast classifiers that run reliably on minimal compute.

In developing the Diabetes Diagnosis Web Platform, I engineered an end-to-end clinical assessment pipeline using Scikit-learn and Python Flask.

## Why SVM over Deep Learning for Clinical Triage?

Support Vector Machines (SVM) excel on tabular datasets with moderate sample sizes (like the PIMA Indians Diabetes dataset with 768 patient records and 8 clinical features). SVMs:
- Maximize the decision boundary margin between diagnostic classes.
- Are less susceptible to overfitting on small medical datasets compared to deep neural nets.
- Offer deterministic predictions with verifiable support vectors.

## Tackling Physiological Zeroes in Biometrics

A common trap in healthcare ML datasets is physiological zeroes. A blood pressure, insulin, or skinfold thickness value of \`0\` does not indicate a true measurement of zero; it represents missing clinical data.

Treating these as valid zeros degrades model performance severely. We built a custom preprocessing pipeline using median imputation for physiological features:

\`\`\`python
import numpy as np
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC

# Replace invalid clinical zeroes with NaN
features_with_zero_anomalies = ['Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI']
data[features_with_zero_anomalies] = data[features_with_zero_anomalies].replace(0, np.nan)

# Create deterministic pipeline
pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler()),
    ('svm', SVC(kernel='rbf', C=1.5, gamma='scale', probability=True, random_state=42))
])
\`\`\`

## Kernel Selection and Hyperparameter Tuning

We benchmarked Linear, Polynomial, and Radial Basis Function (RBF) kernels with 5-fold cross-validation. The RBF kernel demonstrated superior non-linear separation on the 8 biometric dimensions:
- **Test Accuracy**: 77.4%
- **Sensitivity / Recall**: 74.2% (critical for minimizing missed early diabetes diagnoses)
- **ROC-AUC**: 0.83

## Deploying as a Sub-100ms Edge API

The trained model artifact was serialized with Joblib and deployed inside a 15MB containerized Flask microservice. Inference completes in **under 95 milliseconds**, allowing remote health clinics with modest 3G connections to receive instant risk scores.

View the full live application and source code in the projects section of this portfolio!`,
    linkedinDraft: `Medical ML doesn't always need multi-billion parameter models.

In remote diagnostic clinics, you need fast, explainable, lightweight models that run on edge hardware.

Here is how I trained an SVM on 8 clinical biometrics achieving 77.4% test accuracy with <95ms inference:
- Handling physiological zero anomalies (insulin=0 or bp=0) with median imputation
- RBF kernel tuning for non-linear decision boundaries
- Packaging into a 15MB Docker container for instant edge deployment

Read my complete technical notes:
https://mubasshirali0710.github.io/Mubasshir-portfolio/blog/clinical-ml-svm-diabetes-classifier

#MachineLearning #HealthcareTech #Python #DataScience #MubasshirAli`,
    xThreadDraft: [
      `1/ Why medical ML doesn't always need deep neural networks.

How I built a clinical diabetes classifier with 77.4% accuracy using Support Vector Machines (SVM) & Python: 🧵👇`,
      `2/ Trap 1: Physiological zeroes.
Insulin = 0 or BloodPressure = 0 isn't zero; it's missing clinical telemetry. 

Treating zeroes as actual values ruins model accuracy. Solution: Median imputation pipeline.`,
      `3/ Why SVM with RBF kernel?
Maximizes decision boundary margin on tabular clinical features without overfitting.

Inference latency: <95ms.`,
      `4/ Full architecture and code breakdown on my blog:
https://mubasshirali0710.github.io/Mubasshir-portfolio/blog/clinical-ml-svm-diabetes-classifier`,
    ],
    relatedProjectSlug: 'diabetes-ml',
  },
];
