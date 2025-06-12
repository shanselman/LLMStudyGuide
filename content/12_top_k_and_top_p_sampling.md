# Question 12: How do top-k and top-p sampling differ in text generation?

**Human Answer (Hao Hoang):**
Top-k sampling selects the k most probable tokens (e.g., k = 20) for random sampling, ensuring controlled diversity. Top-p (nucleus) sampling chooses tokens whose cumulative probability exceeds a threshold p (e.g., 0.95), adapting to context. Top-p offers more flexibility, producing varied yet coherent outputs in creative writing.

**AI Answer:**
Top-k and top-p (nucleus) sampling are two popular techniques for controlling the diversity and quality of text generation by restricting the sampling space to the most probable tokens.

**Top-k Sampling:**

**Algorithm:**
1. Sort tokens by probability in descending order
2. Keep only the top k tokens
3. Renormalize probabilities among these k tokens
4. Sample from this restricted distribution

**Example:**
```
Original: [the: 0.4, cat: 0.3, dog: 0.15, bird: 0.1, fish: 0.05]
Top-k (k=3): [the: 0.47, cat: 0.35, dog: 0.18]
```

**Characteristics:**
- **Fixed Size**: Always considers exactly k tokens
- **Context Insensitive**: Same k regardless of probability distribution shape
- **Sharp Distributions**: May include very low-probability tokens
- **Flat Distributions**: May exclude reasonable options

**Top-p (Nucleus) Sampling:**

**Algorithm:**
1. Sort tokens by probability in descending order
2. Find the smallest set whose cumulative probability ≥ p
3. Sample from this nucleus set

**Example:**
```
Original: [the: 0.4, cat: 0.3, dog: 0.15, bird: 0.1, fish: 0.05]
Top-p (p=0.8): [the: 0.57, cat: 0.43] (0.4 + 0.3 = 0.7 < 0.8, add dog: 0.85 > 0.8)
Actual nucleus: [the: 0.47, cat: 0.35, dog: 0.18]
```

**Detailed Comparison:**

| Aspect | Top-k | Top-p |
|--------|-------|-------|
| **Adaptiveness** | Fixed vocabulary size | Adaptive to distribution |
| **Sharp Distributions** | May include unlikely tokens | Focuses on high-probability region |
| **Flat Distributions** | May exclude good options | Includes more diverse options |
| **Computational Cost** | O(k) after sorting | O(n) to find nucleus |
| **Hyperparameter Tuning** | Integer k (typically 20-50) | Float p (typically 0.9-0.95) |

**Hybrid Approaches:**

**Top-k + Top-p:**
```python
# Apply both filters
logits = apply_top_k_filter(logits, k=40)
logits = apply_top_p_filter(logits, p=0.9)
probs = softmax(logits)
next_token = sample(probs)
```

**Typical Ranges:**
- **Top-k**: k ∈ [10, 100], commonly k = 40
- **Top-p**: p ∈ [0.8, 0.95], commonly p = 0.9

**Use Case Guidelines:**

**Top-k is better when:**
- You want consistent vocabulary size
- Working with domain-specific text
- Computational efficiency is crucial
- Distribution shapes vary dramatically

**Top-p is better when:**
- You want adaptive vocabulary size
- Working with general text generation
- Quality is more important than speed
- Distributions have natural probability cliffs

**Advanced Variations:**

**1. Dynamic Top-k/p:**
- Adjust parameters based on context or uncertainty
- Higher diversity in creative sections
- Lower diversity in factual sections

**2. Contrastive Search:**
- Balance between model confidence and diversity
- Penalize repetition explicitly
- Better for longer text generation

**3. Typical Sampling:**
- Sample from tokens with "typical" information content
- Based on conditional entropy
- More principled than top-k/p

**Research Citations:**
- [Holtzman, A., et al. (2020). "The Curious Case of Neural Text Degeneration"](https://arxiv.org/abs/1904.09751) - Introduces nucleus (top-p) sampling and analyzes text generation quality
- [Fan, A., Lewis, M., & Dauphin, Y. (2018). "Hierarchical Neural Story Generation"](https://arxiv.org/abs/1805.04833) - Early work on controllable text generation techniques
- [Meister, C., et al. (2022). "Typical Sampling for Natural Language Generation"](https://arxiv.org/abs/2202.00666) - Introduces typical sampling as alternative to top-k/p

**YouTube Resources:**
- [Text Generation Strategies - Hugging Face Course](https://www.youtube.com/watch?v=G5lmya6eKtc) - Comprehensive guide to different sampling methods
- [Controlling Neural Text Generation - Stanford CS224N](https://www.youtube.com/watch?v=BfnbNNHejYU) - Academic lecture on generation strategies including top-k and top-p
- [Understanding Nucleus Sampling - AI Coffee Break](https://www.youtube.com/watch?v=_XkP2StahGM) - Deep dive into top-p sampling mechanics

**Follow-up Research:**
1. Implement and compare different sampling strategies on various text types
2. Study the impact of sampling parameters on text quality metrics
3. Develop adaptive sampling strategies based on context

---

