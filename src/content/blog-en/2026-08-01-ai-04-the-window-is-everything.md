---
title: "Outside the Window, There is Nothing"
date: 2026-08-01
description: "In a single call, a model sees only the string it is passed. This visible range is called the window. The further you extend the window, the more expensive it becomes, and how you discard data when it overflows becomes a matter of design."
tags: ["Until Now"]
draft: false
src_hash: 7db8ad6991e4
---

Artificial intelligence that writes text is called a Large Language Model. In English, it's written as LLM for short. OpenAI's GPT, Google's Gemini, and Anthropic's Claude fall into this category. Hereafter, I will refer to them as models.

In a single call, the model sees only the string passed to it at that moment. Anything outside of that does not exist for the model.

This visible range is called the context window. Since that's a mouthful, I'll just call it the window.

## The Window is the Shape of the Solution

The window is not a restriction added after the fact.

The origins of this mechanism lie in machine translation, where the biggest hurdle at the time was that translations would break when dealing with long sentences. The solution to this was a concept called the attention mechanism; the method involves looking at the entirety of the input sentence every time an output word is generated. The moment the approach of "looking at the whole" was chosen, a range that could be looked at was born. That is the window.

Therefore, the window is not a matter of technical specifications; it is the very shape of the mechanism by which the model reads.

## How Large Is It Now?

The unit of measurement is not words, but smaller units called tokens. In Japanese, one character often equals roughly one token.

As of 2026, listing the commonly used ones looks like this: the high-end versions of both Claude and GPT are one million tokens. Even for Claude, a lighter version is 200,000 tokens—a fivefold difference. The high-end Gemini is two million tokens. Among those with open weights, there are some as large as ten million.

One million tokens is roughly equivalent to about ten paperback books in Japanese. It feels like quite a lot can fit.

However, there is a fivefold difference even within the same company. The moment you choose the faster, cheaper option, the amount that fits becomes one-fifth. What you can achieve changes depending on which one your tools are calling.

## The Further You Extend the Window, the Higher the Cost

The attention mechanism looks at every possible combination of the passed words. This is because it measures how deeply each word relates to every other word.

Consequently, when the length doubles, the combinations quadruple. If it increases tenfold, they increase a hundredfold. The window does not become more expensive linearly as you extend it; it becomes more expensive quadratically.

This is presented exactly in a table in the original 2017 paper. It lists side-by-side that the computational complexity of the attention mechanism is proportional to the square of the number of words, whereas previous recursive mechanisms were proportional to the number of words. The authors at the time wrote this as an advantage in speed. This was because sentences to be translated were at most a few dozen words, and at that length, even a quadratic cost was cheap.

The fact that windows extended to hundreds of thousands of words is a story for later. That same table now serves as an explanation for the price.

In reality, there are optimizations. Since it would be wasteful to recalculate everything every time a word is produced, intermediate calculation results are saved and reused. This makes the computation per word significantly lighter.

However, saving those results takes up space. Moreover, this increases proportionally as the window grows longer. In models with large windows, it is possible to exhaust all available memory just by storing these cached results.

A large window is not inherently a good thing. It is bought by sacrificing something else.

## What to Discard When it Overflows

The window has an upper limit. If you continue a conversation, you will eventually exceed it.

At that point, a decision must be made regarding what to do with the excess. I believe this is where the most impact occurs.

The simplest approach is to discard the oldest information first, keeping only the most recent. It's easy to build and sufficient for most casual chatter.

But this often breaks. In long tasks, important premises are usually established at the beginning: what is being created, what was decided not to do, whose decision it was. Those things come first, followed by detailed work. If you discard from the oldest, the premises are the first to fall.

After that, the model continues to output plausible-looking strings in a state devoid of premises. Since plausibility is evident in the appearance, it cannot be detected from the outside.

## What Is Not in the Window, Does Not Exist

I think this is the line that matters.

Reference materials you want it to use will not be referenced unless they are in the window. Promises you want it to keep will not be kept if they aren't in the window. Even things you are sure you said before are the same as if they were never said if they have fallen out of the window.

Saying a model "forgot" is usually inaccurate. What has happened is that it was not put into the window.

And the one deciding what to put in and what to drop is not the model.
