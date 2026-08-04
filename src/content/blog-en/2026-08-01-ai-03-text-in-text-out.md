---
title: "You give it text, and text comes out"
date: 2026-08-01
description: "There is only one operation a large language model can perform. Conversation, tool use—it all sits atop that single function. That is why everything preceding the current moment is resent every single time."
tags: ["Until now"]
draft: false
src_hash: f86db31b9f7e
---

Artificial intelligence that writes text is called a Large Language Model. In English, it's abbreviated as LLM. OpenAI's GPT, Google's Gemini, and Anthropic's Claude are examples of this. Hereafter, I will refer to them as "models."

There is only one operation these models can perform.

You pass it a string of characters, and it returns a string of characters. That is all. Conversation, having them read documents, letting them use tools—it all sits atop this one single function.

## It doesn't remember previous conversations

Models are used by calling them from an external program. This interface is called an API. In the documentation for that interface, it says this:

> This API is stateless, so please always send the entire conversation history.

This isn't some hidden specification. It's written on the first page.

In other words, every single call is completely independent. What was discussed last time does not remain on the other side. We are the ones who hold the conversation history.

So, why does it look like a continuous conversation?

It is because every time, everything up to that point is being resent.

On the third exchange, the first question and answer, the second question and answer, and the current question are all lined up and passed over. By the tenth exchange, nine exchanges' worth of data is sent in its entirety every time. The model reads it for the first time, every single time.

It wasn't remembering. I was reminding it every time.

## Using tools is also just strings of characters

Nowadays, you can have AI perform searches, read files, or run programs. Those are built on the same mechanism.

First, a list of available tools is passed as a string. The model then outputs something like: "Use this tool by passing it this specific string." That is all. The actual searching or opening of files is done by the external program.

Once a result is produced, it is turned back into a string and sent back as a continuation of the conversation. The model reads that for the first time and returns the next string.

It looks like it's using a tool, but all the model did was output a string containing the name of the tool.

## As conversations grow longer, every turn becomes heavier

From this, one practical conclusion emerges.

The longer the interaction, the more data is sent per turn. Getting a single sentence in response during the tenth exchange takes many times longer than it did during the third. Time and cost are proportional to this.

The feeling that things suddenly became slower or more expensive during the latter half of a long conversation is not an illusion. In reality, a larger bundle is being sent every time.

## Everything that looks like memory is external work

To summarize:

The model remembers nothing. Each time, it reads only what was passed to it and returns a string.

If you have an experience where it took into account yesterday's conversation or remembered a preference you mentioned before, that wasn't the model remembering. An external program pulled out yesterday's records and secretly mixed them into the current input.

Therefore, whether a "memory" is good or bad is not a question of the model's intelligence. It is a question of the external design—deciding what to mix in and how.
