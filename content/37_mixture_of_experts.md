# Question 37: How does Mixture of Experts (MoE) enhance LLM scalability?

**Human Answer (Hao Hoang):**
MoE uses a gating function to activate specific expert sub-networks per input, reducing computational load. For example, only 10% of a model's parameters might be used per query, enabling billion-parameter models to operate efficiently while maintaining high performance.

**AI Answer:**
MoE enhances scalability by activating only a subset of model parameters per input through a gating mechanism, enabling massive model capacity while maintaining computational efficiency.

**Architecture:**
- **Expert networks**: Specialized sub-models
- **Gating function**: Routes inputs to relevant experts
- **Sparsity**: Only top-k experts activated per token

**Benefits:**
- **Conditional computation**: O(1) experts active vs O(N) total
- **Specialization**: Experts learn domain-specific patterns
- **Scalability**: Add experts without increasing per-sample cost

**Implementation:**
```python
class MoELayer(nn.Module):
    def __init__(self, d_model, num_experts, top_k=2):
        self.experts = nn.ModuleList([FFN(d_model) for _ in range(num_experts)])
        self.gate = nn.Linear(d_model, num_experts)
        self.top_k = top_k
    
    def forward(self, x):
        gate_scores = self.gate(x)
        top_k_scores, top_k_indices = torch.topk(gate_scores, self.top_k)
        
        output = torch.zeros_like(x)
        for i in range(self.top_k):
            expert_output = self.experts[top_k_indices[i]](x)
            output += top_k_scores[i] * expert_output
        
        return output
```

**Research Citations:**
- [Fedus, W., et al. (2022). "Switch Transformer: Scaling to Trillion Parameter Models"](https://arxiv.org/abs/2101.03961) - Switch Transformer with expert routing
- [Shazeer, N., et al. (2017). "Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer"](https://arxiv.org/abs/1701.06538) - Original sparse MoE architecture

**YouTube Resources:**
- [Mixture of Experts Explained - Yannic Kilcher](https://www.youtube.com/watch?v=3AIpPlzM_qs) - Technical deep dive into MoE architectures
- [Switch Transformer - AI Coffee Break](https://www.youtube.com/watch?v=T2VmBGl18zI) - Switch Transformer and expert routing
- [Scaling with MoE - Google DeepMind](https://www.youtube.com/watch?v=mJoK1Hm2BgQ) - Large-scale MoE implementation

---

