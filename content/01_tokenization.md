# Question 1: What does tokenization entail, and why is it critical for LLMs?

**Human Answer (Hao Hoang):**
Tokenization involves breaking down text into smaller units, or tokens, such as words, subwords, or characters. For example, "artificial" might be split into "art," "ific," and "ial." This process is vital because LLMs process numerical representations of tokens, not raw text. Tokenization enables models to handle diverse languages, manage rare or unknown words, and optimize vocabulary size, enhancing computational efficiency and model performance.

**AI Answer:**
Tokenization is the process of breaking down text into smaller, manageable units called tokens. These tokens can be words, subwords, characters, or even bytes, depending on the tokenization strategy employed.

**Key Concepts:**
- **Word-level tokenization**: Splits text by spaces and punctuation
- **Subword tokenization**: Uses algorithms like BPE (Byte-Pair Encoding) or SentencePiece
- **Character-level tokenization**: Each character becomes a token
- **Byte-level tokenization**: Used by models like GPT-2 for handling any text

**Why it's critical:**
1. **Vocabulary Management**: Limits the vocabulary size to manageable numbers (typically 50K-100K tokens)
2. **OOV Handling**: Subword tokenization helps handle out-of-vocabulary words
3. **Computational Efficiency**: Reduces the dimensionality of the embedding space
4. **Cross-lingual Support**: Enables models to work across different languages

**Research Citations:**
- [Sennrich, R., Haddow, B., & Birch, A. (2016). "Neural Machine Translation of Rare Words with Subword Units"](https://aclanthology.org/P16-1162/) | [arXiv](https://arxiv.org/abs/1508.07909)
- [Kudo, T. (2018). "Subword Regularization: Improving Neural Network Translation Models with Multiple Subword Candidates"](https://aclanthology.org/P18-1007/) | [arXiv](https://arxiv.org/abs/1804.10959)

**YouTube Resources:**
- [Let's build the GPT Tokenizer - Andrej Karpathy](https://www.youtube.com/watch?v=zduSFxRajkE) - Comprehensive 2+ hour tutorial building tokenizers from scratch
- [Byte Pair Encoding (BPE) Tutorial - Hugging Face](https://huggingface.co/learn/llm-course/en/chapter6/5) - Interactive tutorial on BPE tokenization

**Follow-up Research:**
1. Implement BPE tokenization from scratch
2. Compare different tokenization strategies on multilingual datasets
3. Study the impact of vocabulary size on model performance