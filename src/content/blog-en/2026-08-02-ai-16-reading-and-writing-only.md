---
title: "Only Capable of Reading and Writing"
date: 2026-08-02
description: "What can AI actually do? Reading and writing text, images, and audio—and programming. That is all. Whenever you unpack the claim that it 'did something,' it always falls into one of these categories."
tags: ["Until Now"]
draft: false
src_hash: 77f2b119343f
---

Artificial intelligence that writes text is called a Large Language Model. In English, it's abbreviated as LLM. OpenAI's GPT, Google's Gemini, and Anthropic's Claude are examples of this. Hereafter, I will refer to them as "models."

What can AI actually do?

The reading and writing of text, images, and audio. And programming. That is all.

## Only Four Things

Let me list them in order.

Reading text. Writing text. This was the original function, carried over from tools created for translation.

Reading images. Creating images. Both asking it to look at a photo and say what is in it, and having it create a picture from words, are possible.

Listening to audio. Speaking audio. Transcribing recordings into text and turning text into a voice are now integrated into the same mechanism.

Writing programs. This is a type of text. Since programming languages are notations for humans to read and write, from the model's perspective, they are no different from Japanese.

That is everything.

## Because it's all just a job of sequencing

What these four have in common is that they take shape by arranging elements one by one based on probability.

Characters are lined up one by one. Programming symbols are lined up one by one. Images are gradually shaped starting from noise. Audio is sliced into tiny units and determined in sequence. While the details of the procedure differ, the action—choosing what is likely to come next and adding it—is the same.

That is why these four things are possible. And anything that cannot be reduced to this action is something the AI cannot do at all.

## Unpacking "AI did X"

When you unpack the stories told in the world, they always fall into one of these four categories.

"AI summarized a meeting." It read audio and wrote text. A combination of two.

"AI researched materials." An external program performed the search; the model read the returned text and wrote text. It did not perform the act of "searching."

"AI drew a graph." It wrote a program to draw a graph, which was then executed externally. It did not draw the image directly.

"AI made a reservation." It output a string of text saying "use this tool with this content," and the actual operation of reserving was handled by an external program.

"AI created a table." It wrote text with delimiters. The fact that it looks like a table is due to the display on the receiving end.

In every case, all the model did was read and write. The parts that actually "moved" were entirely outside of it.

## Things outside the four

Conversely, the model cannot do a single thing that lies outside these four.

Remembering. Since previous conversations are not retained, the external system refills the context every time.

Counting or processing things in a specific order. The procedure of carrying intermediate values is outside the action of sequencing.

Executing. The model's job ends at outputting a string; the external system is what makes it run.

Verifying whether something is correct. Such verification is not built into the mechanism.

Furthermore, these are not the kinds of problems that will be solved simply by a "smarter" model appearing. Because the functionality isn't there, it can only be added from the outside.

## Few, but sufficient

Saying there are only four things makes it sound like a small amount. In reality, it is sufficient.

This is because much of human work consists of reading and writing. Organizing meeting notes, summarizing materials, writing replies, deciding specifications, and giving them shape. When you list them out, almost all of it is reading and writing.

On top of that, one of the four is programming. Being able to write programs means being able to create the things that lie outside those four. For counting, executing, or verifying—you simply have it write the program that does those things.

It can only read and write. But within reading and writing, there is a tool for creating everything outside of reading and writing.
