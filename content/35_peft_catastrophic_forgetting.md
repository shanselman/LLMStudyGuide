# Question 35: How does PEFT mitigate catastrophic forgetting?

**Human Answer (Hao Hoang):**
Parameter-Efficient Fine-Tuning (PEFT) updates only a small subset of parameters, freezing the rest to preserve pretrained knowledge. Techniques like LoRA ensure LLMs adapt to new tasks without losing core capabilities, maintaining performance across domains.

**AI Answer:**
Parameter-Efficient Fine-Tuning (PEFT) mitigates catastrophic forgetting by updating only a small subset of parameters while freezing the majority, preserving pre-trained knowledge while adapting to new tasks.

**Key Techniques:**
- **LoRA**: Low-rank adaptation matrices
- **Adapters**: Small bottleneck layers
- **Prefix tuning**: Learnable prompt vectors
- **BitFit**: Fine-tune only bias parameters

**Mechanism:**
```python
# LoRA example
output = W_0 × input + (B × A) × input
# Where W_0 is frozen, B×A is trainable low-rank adaptation
```

**Research Citations:**
- [Hu, E. J., et al. (2022). "LoRA: Low-Rank Adaptation of Large Language Models"](https://arxiv.org/abs/2106.09685) - Low-rank adaptation for parameter-efficient fine-tuning
- [Houlsby, N., et al. (2019). "Parameter-Efficient Transfer Learning for NLP"](https://arxiv.org/abs/1902.00751) - Adapter layers for transfer learning

**YouTube Resources:**
- [LoRA Explained - AI Coffee Break](https://www.youtube.com/watch?v=dA-NhCtrrVE) - Low-rank adaptation technique breakdown
- [Parameter Efficient Fine-tuning - Hugging Face](https://www.youtube.com/watch?v=Us5ZFp16PaU) - PEFT methods comparison
- [Adapters vs LoRA - Yannic Kilcher](https://www.youtube.com/watch?v=YVU5wAA6Txo) - Technical comparison of PEFT approaches

---

---

📚 **Want deeper context and business insights?** Check out the [extended context for this topic](content/35_peft_catastrophic_forgetting_context.md) for real-world applications, interview perspectives, and practical implications.