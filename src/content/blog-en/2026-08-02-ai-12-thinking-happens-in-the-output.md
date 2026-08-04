---
title: "Thinking Happens Within the Output"
date: 2026-08-02
description: "The idea that asking an AI to think step-by-step improves the answer is not a matter of psychology. Since only what has been output becomes material for the next judgment, if it doesn't write, there is no place to think. This is a matter of mechanism."
tags: ["Until Now"]
draft: false
src_hash: 18f5c5756014
---

Artificial intelligence that writes text is called a Large Language Model. In English, it's written as LLM. OpenAI's GPT, Google's Gemini, and Anthropic's Claude fall into this category. Hereafter, I will refer to them as "models."

Adding a phrase like "Please think step-by-step" improves the answer. This is well known, and it's usually explained by saying, "If you tell it that, it will be more thorough."

I don't think that's the case. This is a matter of mechanism.

## The outputted words become the next material

A model assigns probabilities to the word most likely to come next and selects one. Once selected, it appends that word to the end of the sentence and repeats the process.

What is important here is the state after appending. When choosing the second word, the first word has become part of the input. When choosing the third word, both the first and second words are included as material.

In other words, only the words that have been output can be used for the next judgment. What is not output remains nowhere.

## The inability to "think in one's head before writing"

Humans can think before they write. We arrange options in our heads, compare them, discard some, and then write what remains. The written sentence is only the conclusion; the process of comparison does not emerge externally.

Models have no such internal space that remains hidden from the outside.

Since their only action is selecting one word at a time, the only place they have to accumulate material for thinking is the output itself. Writing *is* thinking.

Therefore, if you make them write only the conclusion immediately, the conclusion emerges without any space for comparison. A plausible-sounding conclusion comes out in one shot. Sometimes it's right, sometimes it's wrong, but in either case, no deliberation has occurred.

If you make them write step-by-step, the story changes. A line written midway becomes material for choosing the next line. If you make them list conditions, they choose the next step while looking at those conditions. If you make them list three candidates, they can compare them by looking at those three.

It works not because the model decided to be thorough, but because the amount of material increased.

## A change triggered by showing just eight examples

The first to demonstrate this was a 2022 paper by Jason Wei and others. It is titled "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models."

The abstract states:

> By prompting a language model with 540 billion parameters with just eight examples of a chain-of-thought, it reached the state-of-the-art accuracy at the time on tasks consisting of arithmetic word problems. It even outperformed GPT-3, which had been fine-tuned with a verification mechanism.

The important point is that the model was not modified at all. It wasn't retrained, nor was it made larger. Only eight examples were added to the prompt.

The fact that this changed the result means that what was lacking was not capability, but rather how the material was placed.

## Practical conclusions from this

There are three practical takeaways.

First: The more difficult the judgment, the more you must avoid asking for only the conclusion. Make them write what they based their decision on first. Specifying the format—"First list the conditions, then decide"—is more effective than asking them to "think carefully." The former creates a place to put the material, while the latter changes nothing.

Second: Making them write the intermediate steps allows for verification. If it's done in their "head," it's invisible from the outside, but if it's written, it can be read. You can tell whether the error is in the conclusion or in a specific line of the process. Once identified, you can fix just that one line.

Third: However, the intermediate lines are also chosen by probability in the same way. If a wrong premise is written, the conclusion built upon it will also collapse. In fact, because there is a plausible-looking intermediate calculation, it becomes easier to believe than when only the conclusion is provided. The presence of intermediate steps does not guarantee correctness.

## Why the way you ask works

The results of these machines change significantly depending on how you ask. If we describe this as "compatibility" or "knacks," the number of things to memorize increases infinitely.

Looking at it from the side of the mechanism, effective prompts are generally doing one thing: they are making the model place the material for the next choice within the output in advance.

Pasting reference materials before asking a question, having conditions listed in bullet points, or having candidates listed before selecting one—these all share the same form. They arrange the material within the window first, then let the model choose what comes next.

If you want them to think, make them write. What is not written has not been thought.
