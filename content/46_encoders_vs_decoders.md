# Question 46: How do encoders and decoders differ in transformers?

**Human Answer (Hao Hoang):**
Encoders process input sequences into abstract representations, capturing context. Decoders generate outputs, using encoder outputs and prior tokens. In translation, the encoder understands the source, and the decoder produces the target language, enabling effective Seq2Seq tasks.

**AI Answer:**
Encoders and decoders in transformers serve complementary roles: encoders create contextual representations of input sequences using bidirectional attention, while decoders generate output sequences autoregressively using masked self-attention and cross-attention to encoder outputs.

**Encoder Architecture:**
- **Bidirectional attention**: Can attend to all positions
- **Self-attention**: Builds contextual representations
- **Non-causal**: Processes entire sequence simultaneously
- **Applications**: BERT, RoBERTa, understanding tasks

**Decoder Architecture:**
- **Causal attention**: Masked to prevent future information leakage
- **Cross-attention**: Attends to encoder outputs
- **Autoregressive**: Generates tokens sequentially
- **Applications**: GPT, text generation, language modeling

**Encoder-Decoder Models:**
- **Examples**: T5, BART, machine translation models
- **Best of both**: Understanding and generation capabilities
- **Cross-attention**: Bridges encoder and decoder representations

**Research Citations:**
- [Vaswani, A., et al. (2017). "Attention Is All You Need"](https://arxiv.org/abs/1706.03762) - Original transformer with encoder-decoder architecture
- [Lewis, M., et al. (2020). "BART: Denoising Sequence-to-Sequence Pre-training"](https://arxiv.org/abs/1910.13461) - BART combining bidirectional encoder with autoregressive decoder

**YouTube Resources:**
- [Encoder vs Decoder - AI Coffee Break](https://www.youtube.com/watch?v=S7oA5C43Rbc) - Clear explanation of encoder and decoder differences
- [Transformer Architecture - 3Blue1Brown](https://www.youtube.com/watch?v=eMlx5fFNoYc) - Visual explanation of encoder-decoder mechanisms
- [BERT vs GPT Architecture - Yannic Kilcher](https://www.youtube.com/watch?v=UU1WVnMk4E8) - Comparison of encoder-only vs decoder-only models

---

