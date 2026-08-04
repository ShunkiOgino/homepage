---
title: "It Is a Descendant of the Translator"
date: 2026-08-01
description: "The papers that form the foundation of today's artificial intelligence are papers on machine translation. Most of the evaluations were based on translation; they were not created for conversation."
tags: ["Until Now"]
draft: false
src_hash: 19978d62394a
---

What kind of machine was the AI that writes text originally built to be?

It wasn't for having conversations. The place where that mechanism was first established was translation. Not as a metaphor, but actual machine translation—converting English into French.

These things are called Large Language Models. In English, they are referred to as LLMs. OpenAI's GPT, Google's Gemini, and Anthropic's Claude fall into this category. Since that is a mouthful, I will refer to them as "models" from here on.

## Cramming Everything into a Single Sequence of Numbers

In 2014, Ilya Sutskever and others proposed a method for performing translation using only neural networks. This is a computational mechanism that mimics the way neurons in the brain connect; instead of humans writing rules, the system is adjusted by showing it a massive amount of examples.

The mechanism was simple. It reads the input sentence and converts it into a single sequence of numbers. From there, it constructs the output sentence one word at a time. It is divided into two parts—the reader and the writer—and the only thing connecting them was that single sequence of numbers. Using translation data available at the time, it achieved high scores for English to French.
The quality of the translation was measured by a machine that scored how much it overlapped with sentences translated by humans.

However, there was a bottleneck. It would break when the sentences became long. This is because whether it was a three-word sentence or a thirty-word sentence, everything was crammed into a single sequence of numbers of the same length.

## Deciding to Look at the Whole

In that same year, Dzmitry Bahdanau, Kyunghyun Cho, and Yoshua Bengio removed this bottleneck. The paper was titled "Neural Machine Translation by Jointly Learning a Soft Alignment and Translation."

What they did was stop condensing everything into one sequence. Every time an output word is generated, the system looks at the entirety of the input sentence and allows itself to choose the parts that are currently relevant.

This was the beginning of what is called the "Attention Mechanism." It was created to fix accidents in translation.

## The Paper That Said "That's All You Need"

Three years later, in 2017, a paper titled "Attention Is All You Need" was released. As the title suggests, it proposed discarding all previous reading and writing structures and building the system using only the attention mechanism.

The evaluations listed in this paper are almost entirely translation. Specifically, English to German and English to French from a 2014 translation contest. The scores were 28.4 and 41.8, respectively. Aside from translation, they only tried one English syntactic analysis, and even that was merely a supplement to show that the method worked for other tasks.

Almost every model operating in the world today is a descendant of this paper.

## Making Something Not Meant for Conversation Converse

When you line these three up, the lineage becomes clear. Receive a string of characters and return another string of characters. Translation is exactly that kind of work. And it has arrived at the present day in that exact form.

It was not designed as a machine for conversation. Conversation is something that was layered on top of that form afterward.

The parts that feel off when using these models generally stem from this.
