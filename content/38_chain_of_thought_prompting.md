# Question 38: What is Chain-of-Thought (CoT) prompting, and how does it aid reasoning?

**Human Answer (Hao Hoang):**
CoT prompting guides LLMs to solve problems step-by-step, mimicking human reasoning. For example, in math problems, it breaks down calculations into logical steps, improving accuracy and interpretability in complex tasks like logical inference or multi-step queries.

**AI Answer:**
Chain-of-Thought prompting guides LLMs to solve complex problems step-by-step by including intermediate reasoning steps in the prompt, significantly improving performance on mathematical, logical, and commonsense reasoning tasks.

**Mechanism:**
Instead of direct question → answer, CoT uses:
Question → Reasoning Steps → Answer

**Example:**
```
Standard: "What is 15% of 80?"
Answer: "12"

CoT: "What is 15% of 80?"
"To find 15% of 80:
Step 1: Convert 15% to decimal: 15% = 0.15
Step 2: Multiply: 0.15 × 80 = 12
Therefore, 15% of 80 is 12."
```

**Variants:**
- **Few-shot CoT**: Include reasoning examples in prompt
- **Zero-shot CoT**: Add "Let's think step by step"
- **Auto-CoT**: Automatically generate reasoning chains
- **Self-consistency**: Sample multiple reasoning paths

**Research Citations:**
- [Wei, J., et al. (2022). "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models"](https://arxiv.org/abs/2201.11903) - Original chain-of-thought prompting paper
- [Wang, X., et al. (2022). "Self-Consistency Improves Chain of Thought Reasoning"](https://arxiv.org/abs/2203.11171) - Self-consistency decoding for improved reasoning

**YouTube Resources:**
- [Chain of Thought Prompting - AI Explained](https://www.youtube.com/watch?v=_VjQlb_Yhp8) - CoT prompting techniques overview
- [Reasoning with Large Language Models - DeepLearning.AI](https://www.youtube.com/watch?v=pzKIgaZnxGU) - Advanced reasoning strategies
- [Prompt Engineering for Reasoning - Yannic Kilcher](https://www.youtube.com/watch?v=EvJVrZHlHdw) - Technical analysis of CoT methods

---

