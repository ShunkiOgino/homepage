---
title: "At the End of the Day, It's Just a Probability Generator"
date: 2026-08-01
description: "It doesn't know the answer and then tell it to you. It assigns probabilities to words that are likely to come next and picks one. It simply repeats that process."
tags: ["Until Now"]
draft: false
src_hash: bd347d44c9e2
---

The artificial intelligence that writes text is called a Large Language Model. In English, it's written as LLM for short. OpenAI's GPT, Google's Gemini, and Anthropic's Claude fall into this category. Hereafter, I will refer to them as "models."

These models are not things that know the answer and then tell it to you.

They assign probabilities to words that are likely to come next, and then pick one. Once picked, they consider the next word including that selection. That is all they are doing. The sense that, at the end of the day, it's just a probability generator does not seem to be widely understood.

## What It Is Doing

There is a table listing every word it knows. There are tens of thousands of them.

When you provide a partial sentence, the model assigns a probability to every single word in that table for what comes next. If it gets as far as "Today's weather is," it might assign a high number to "sunny," slightly less to "rainy," and nearly zero to "refrigerator."

From there, it picks one. It can be set to always pick the highest probability, or it can scatter the choices based on those probabilities. The degree of this scattering can be adjusted from the outside.

Once a word is picked, it is added to the end of the sentence, and the process repeats. This continues until a marker indicating the end of the sentence appears. That is all.

## Why Probability?

Because its origins are in translation.

In translation, there is no single correct answer. When translating "I love you" into Japanese, *aishiteru*, *suki da*, or *daisuki* are all possibilities. It changes depending on the context and the translator.

Therefore, it was built not as a machine that produces one answer, but as a machine that holds weights for various candidates. Since the era of statistical machine translation, translating via probability has been the same approach. That form has carried over directly to today.

## What Follows From This

First: if you ask the same thing twice, you may get different answers. This is not a malfunction. Since it is picking from probabilities, this is natural behavior.

Second: the level of certainty does not appear in the look of the output. Whether it picks a word with a 99% probability or one with 3%, what comes out is simply a sentence. The style, the tone, and the confident assertions all emerge in exactly the same way.

Third: for this reason, it doesn't stop even when it doesn't know something. This is because the "likely next word" can always be calculated. Titles of non-existent books and numbers of non-existent legal clauses appear in a plausible form. It is not "lying"; rather, that is the result of continuing to pick plausible words.

## Plausibility Is Not Correctness

What this model maximizes is plausibility. Not correctness.

Usually, these two align well. This is because most of the text in the world contains things that are generally correct. That's why it works well in most situations.

However, there is no mechanism inside that guarantees this alignment. It wasn't even built to ensure they align.

What the user can do is not expect correctness from the model's side. Keep the output in a form that we can verify ourselves. Make it provide sources, double-check calculations separately, and refer to original documents for facts. It may seem tedious, but as long as it is picking by probability, that step cannot be skipped.
