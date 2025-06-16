# Question 16: How do LLMs manage out-of-vocabulary (OOV) words?

**Human Answer (Hao Hoang):**
LLMs use subword tokenization, like Byte-Pair Encoding (BPE), to break OOV words into known subword units. For instance, "cryptocurrency" might split into "crypto" and "currency." This approach allows LLMs to process rare or new words, ensuring robust language understanding and generation.

**AI Answer:**
Out-of-vocabulary (OOV) words are tokens that don't exist in a model's training vocabulary. LLMs handle this challenge through sophisticated tokenization strategies that break down unknown words into known components, ensuring robust language understanding and generation.

**The OOV Problem:**

**Traditional Approaches:**
- Word-level tokenization creates large OOV problems
- Unknown words replaced with [UNK] tokens
- Loss of semantic information
- Poor handling of morphologically rich languages

**Impact of OOV:**
- Reduced model performance on rare words
- Inability to process new terms or names
- Poor generalization to new domains
- Loss of compositional understanding

**Modern Solutions:**

**1. Subword Tokenization:**

**Byte-Pair Encoding (BPE):**
```python
# Example BPE process
"unhappiness" → ["un", "happy", "ness"]
"cryptocurrency" → ["crypto", "currency"] 
"COVID-19" → ["COVID", "-", "19"]
```

**Algorithm:**
1. Start with character-level vocabulary
2. Find most frequent character pairs
3. Merge pairs and add to vocabulary
4. Repeat until desired vocabulary size

**SentencePiece:**
- Treats input as sequence of Unicode characters
- Language-agnostic approach
- Handles whitespace as regular characters
- Better for languages without clear word boundaries

**WordPiece (BERT):**
- Similar to BPE but uses likelihood-based merging
- Maximizes language model likelihood
- Produces more linguistically meaningful subwords

**2. Character-Level Models:**
- Process text at character level
- No OOV problem by definition
- Higher computational cost
- Harder to capture word-level semantics

**3. Byte-Level Models:**
- Ultimate generalization: any text representable
- Used in GPT-2 and later models
- Handle any Unicode text
- Robust to encoding issues

**Detailed Comparison:**

| Method | Vocabulary Size | OOV Rate | Semantic Preservation | Computational Cost |
|--------|-----------------|----------|----------------------|-------------------|
| Word-level | 50K-100K | High | Excellent | Low |
| BPE | 32K-64K | Very Low | Good | Medium |
| Character-level | ~100 | None | Poor | High |
| Byte-level | 256 | None | Poor | High |

**Subword Tokenization Benefits:**

**1. Rare Word Handling:**
```
"antidisestablishmentarianism" → 
["anti", "dis", "establish", "ment", "arian", "ism"]
```
- Preserves morphological structure
- Enables compositional understanding
- Better than single [UNK] token

**2. Multilingual Support:**
```
"programmierung" (German) → ["programm", "ierung"]
"プログラミング" (Japanese) → ["プログラ", "ミング"]
```

**3. Domain Adaptation:**
```
"COVID-19" → ["COVID", "-", "19"]
"blockchain" → ["block", "chain"]
```

**Implementation Details:**

**Training Subword Models:**
```python
import sentencepiece as spm

# Train SentencePiece model
spm.SentencePieceTrainer.train(
    input='corpus.txt',
    model_prefix='tokenizer',
    vocab_size=32000,
    model_type='bpe'
)

# Load and use
sp = spm.SentencePieceProcessor()
sp.load('tokenizer.model')
tokens = sp.encode_as_pieces("Hello world!")
```

**Vocabulary Size Trade-offs:**
- **Smaller vocabulary**: More subword splits, longer sequences
- **Larger vocabulary**: Fewer splits, more rare tokens
- **Typical range**: 32K-64K for most LLMs

**Advanced Techniques:**

**1. Adaptive Tokenization:**
- Different tokenization for different domains
- Dynamic vocabulary based on context
- Learned tokenization strategies

**2. Morphological Awareness:**
- Consider linguistic structure in tokenization
- Better handling of inflected languages
- Preserve meaningful morphemes

**3. Multi-Granularity Tokenization:**
- Combine word, subword, and character levels
- Route different types of tokens differently
- Adaptive processing based on familiarity

**Evaluation Metrics:**

**Tokenization Quality:**
- Subword fertility (average tokens per word)
- Morphological alignment
- Cross-lingual consistency

**Downstream Performance:**
- Task accuracy with different tokenization
- Handling of rare entities
- Generalization to new domains

**Challenges and Limitations:**

**1. Linguistic Bias:**
- BPE may not respect linguistic boundaries
- Different languages have different optimal strategies
- May create meaningless subwords

**2. Computational Overhead:**
- Longer sequences due to subword splitting
- Increased memory and compute requirements
- More complex preprocessing

**3. Interpretability:**
- Harder to understand model decisions
- Subword boundaries may not align with meaning
- Debugging becomes more complex

**Best Practices:**

**1. Vocabulary Design:**
- Include special tokens ([CLS], [SEP], [MASK])
- Reserve space for future expansion
- Consider domain-specific needs

**2. Training Data Quality:**
- Clean and diverse training corpus
- Representative of target domains
- Proper handling of different languages

**3. Evaluation Strategy:**
- Test on rare words and new domains
- Measure both accuracy and efficiency
- Consider human interpretability

**Research Citations:**
- [Sennrich, R., et al. (2016). "Neural Machine Translation of Rare Words with Subword Units"](https://arxiv.org/abs/1508.07909) - Introduces BPE for handling rare words in neural machine translation
- [Kudo, T., & Richardson, J. (2018). "SentencePiece: A simple and language independent subword tokenizer"](https://arxiv.org/abs/1808.06226) - Language-agnostic subword tokenization approach
- [Radford, A., et al. (2019). "Language Models are Unsupervised Multitask Learners"](https://d4mucfpksywv.cloudfront.net/better-language-models/language_models_are_unsupervised_multitask_learners.pdf) - GPT-2 introducing byte-level BPE

**YouTube Resources:**
- [Let's build the GPT Tokenizer - Andrej Karpathy](https://www.youtube.com/watch?v=zduSFxRajkE) - Hands-on implementation of BPE tokenization
- [Tokenization and Text Processing - Hugging Face Course](https://www.youtube.com/watch?v=Yffk5aydLzg) - Comprehensive guide to different tokenization methods
- [Subword Tokenization in NLP - AI Coffee Break](https://www.youtube.com/watch?v=jZC_nNUaSXA) - Clear explanation of BPE, WordPiece, and SentencePiece

**Follow-up Research:**
1. Implement different tokenization algorithms and compare their effectiveness
2. Study the impact of vocabulary size on model performance
3. Develop domain-adaptive tokenization strategies
4. Analyze the linguistic properties of learned subword vocabularies

---

---

📚 **Want deeper context and business insights?** Check out the [extended context for this topic](content/16_out_of_vocabulary_words_context.md) for real-world applications, interview perspectives, and practical implications.