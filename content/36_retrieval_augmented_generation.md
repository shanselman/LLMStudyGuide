# Question 36: What are the steps in Retrieval-Augmented Generation (RAG)?

**Human Answer (Hao Hoang):**
RAG involves:
1. Retrieval: Fetching relevant documents using query embeddings.
2. Ranking: Sorting documents by relevance.
3. Generation: Using retrieved context to generate accurate responses.
RAG enhances factual accuracy in tasks like question answering.

**AI Answer:**
RAG combines retrieval and generation by first retrieving relevant documents from a knowledge base, then conditioning text generation on both the query and retrieved context to improve factual accuracy.

**RAG Pipeline:**
1. **Query Encoding**: Embed user query
2. **Retrieval**: Find relevant documents using similarity search
3. **Context Preparation**: Combine query with retrieved documents
4. **Generation**: Generate response conditioned on augmented context
5. **Post-processing**: Filter and rank outputs

**Implementation:**
```python
def rag_pipeline(query, knowledge_base):
    # 1. Encode query
    query_embedding = encoder(query)
    
    # 2. Retrieve relevant docs
    retrieved_docs = knowledge_base.retrieve(query_embedding, top_k=5)
    
    # 3. Augment query with context
    augmented_prompt = f"Context: {retrieved_docs}\nQuery: {query}\nAnswer:"
    
    # 4. Generate response
    response = generator(augmented_prompt)
    
    return response
```

**Research Citations:**
- [Lewis, P., et al. (2020). "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"](https://arxiv.org/abs/2005.11401) - Original RAG paper combining retrieval with generation
- [Karpukhin, V., et al. (2020). "Dense Passage Retrieval for Open-Domain Question Answering"](https://arxiv.org/abs/2004.04906) - Dense retrieval methods for QA systems

**YouTube Resources:**
- [RAG Explained - AI Explained](https://www.youtube.com/watch?v=T-D1OfcDW1M) - Retrieval-augmented generation overview
- [Building RAG Systems - DeepLearning.AI](https://www.youtube.com/watch?v=u5Vcrwpzoz8) - Practical RAG implementation guide
- [Vector Databases for RAG - Pinecone](https://www.youtube.com/watch?v=klTvEwg3oJ4) - RAG with vector search systems

---

---

📚 **Want deeper context and business insights?** Check out the [extended context for this topic](content/36_retrieval_augmented_generation_context.md) for real-world applications, interview perspectives, and practical implications.