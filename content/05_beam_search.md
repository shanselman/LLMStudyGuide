# Question 5: How does beam search improve text generation compared to greedy decoding?

**Human Answer (Hao Hoang):**
Beam search explores multiple word sequences during text generation, keeping the top k candidates (beams) at each step, unlike greedy decoding, which selects only the most probable word. This approach, with k = 5, for instance, ensures more coherent outputs by balancing probability and diversity, especially in tasks like machine translation or dialogue generation.

**AI Answer:**
Beam search is a heuristic search algorithm that maintains multiple partial sequences (beams) during text generation, offering a balance between exploration and computational efficiency.

**Greedy Decoding:**
- Selects the token with highest probability at each step
- Fast and memory-efficient
- Risk of suboptimal sequences due to local maxima
- Deterministic output

**Beam Search Process:**
1. Maintain k best partial sequences (beam width)
2. For each beam, generate all possible next tokens
3. Score all candidates and keep top k
4. Repeat until end token or max length
5. Return highest-scoring complete sequence

**Mathematical Scoring:**

$$\text{Score(sequence)} = \frac{\log P(w_1, w_2, ..., w_n)}{n^\alpha}$$

Where α is a length penalty parameter to prevent bias toward shorter sequences.

**Advantages of Beam Search:**
- **Better Quality**: Explores multiple paths to find better sequences
- **Diversity**: Can generate multiple candidate outputs
- **Controllable**: Beam width allows tuning exploration vs. computation
- **Length Normalization**: Prevents bias toward shorter sequences

**Limitations:**
- **Computational Cost**: O(k × V) at each step (V = vocabulary size)
- **Repetition**: May generate repetitive text
- **Optimal Solution**: Still heuristic, doesn't guarantee global optimum

**Advanced Variants:**
- **Diverse Beam Search**: Encourages diversity among beams
- **Constrained Beam Search**: Incorporates hard constraints
- **Nucleus Sampling**: Combines with probabilistic sampling

**Research Citations:**
- [Vijayakumar, A. K., et al. (2018). "Diverse Beam Search for Improved Description of Complex Scenes"](https://ojs.aaai.org/index.php/AAAI/article/view/12340) - Introduces diversity constraints to improve beam search quality
- [Klein, G., Kim, Y., Deng, Y., Senellart, J., & Rush, A. M. (2017). "OpenNMT: Open-Source Toolkit for Neural Machine Translation"](https://arxiv.org/abs/1701.02810) - Open-source implementation including beam search algorithms

**YouTube Resources:**
- [Foundations of NLP Explained Visually: Beam Search](https://towardsdatascience.com/foundations-of-nlp-explained-visually-beam-search-how-it-works-1586b9849a24/) - Visual explanation of beam search mechanics and implementation
- [Beam Search Implementation Tutorial - Machine Learning Mastery](https://machinelearningmastery.com/beam-search-decoder-natural-language-processing/) - Step-by-step guide to implementing beam search in Python

**Follow-up Research:**
1. Implement beam search with different scoring functions
2. Compare beam search with sampling methods on various tasks
3. Study the impact of beam width on generation quality and diversity

---

📚 **Want deeper context and business insights?** Check out the [extended context for this topic](content/05_beam_search_context.md) for real-world applications, interview perspectives, and practical implications.