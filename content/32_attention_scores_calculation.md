# Question 32: How are attention scores calculated in transformers?

**Human Answer (Hao Hoang):**
Attention scores are computed as:
$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right) V$$
The scaled dot product measures token relevance, and softmax normalizes scores to focus on key tokens, enhancing context-aware generation in tasks like summarization.

**AI Answer:**
Attention scores in transformers are calculated using scaled dot-product attention, where query-key similarity is computed, scaled, and normalized to create probability distributions over input positions.

**Mathematical Formula:**
$$\text{Attention}(Q,K,V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$

**Step-by-step Process:**
1. Compute similarity: $QK^T$
2. Scale by $\sqrt{d_k}$ to prevent saturation
3. Apply softmax for normalization
4. Weight values by attention probabilities

**Research Citations:**
- [Vaswani, A., et al. (2017). "Attention Is All You Need"](https://arxiv.org/abs/1706.03762) - Original transformer paper with scaled dot-product attention

**YouTube Resources:**
- [Attention Mechanism Explained - Yannic Kilcher](https://www.youtube.com/watch?v=iDulhoQ2pro) - Deep dive into attention score calculation
- [Transformer Attention Visualized - 3Blue1Brown](https://www.youtube.com/watch?v=eMlx5fFNoYc) - Visual explanation of attention mechanisms
- [Self-Attention in Detail - StatQuest](https://www.youtube.com/watch?v=PSs6nxngL6k) - Step-by-step attention computation

---

---

📚 **Want deeper context and business insights?** Check out the [extended context for this topic](content/32_attention_scores_calculation_context.md) for real-world applications, interview perspectives, and practical implications.