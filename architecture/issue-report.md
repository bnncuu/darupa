User Message
   ↓
[Your Backend]
   ├──→ Step 1: RAG Search
   │       ├──→ If found → Return answer
   │       └──→ Else →
   ├──→ Step 2: Search unresolved issues
   │       ├──→ If match → Return "already reported"
   │       └──→ Else →
   ├──→ Step 3: Call Gemini to summarize into issue report
   └──→ Step 4: Save to DB + Notify user
