---
title: "Only Things That Can Be Run Fix Themselves"
date: 2026-08-02
description: "Why are machines that choose based on probability practical when it comes to code? Because code can be executed, allowing the machine to determine when it has failed. Writing lacks this. This difference explains most of it."
tags: ["Reflections"]
draft: false
src_hash: 41b9d34c2af6
---

Artificial intelligence that writes text is called a Large Language Model. In English, it's abbreviated as LLM. OpenAI's GPT, Google's Gemini, and Anthropic's Claude fall into this category. Hereafter, I will refer to them as "models."

All a model can do is arrange things based on probability. Text, its sibling—programming code, and images. That is all.

Despite this, tools that have them write programs can be left alone to handle a significant portion of the work. Since they are choosing based on probability, they should be missing the mark, yet we can leave them to it. Why?

## The failure rate is the same

First, it's not that they don't fail.

Programs written by models often don't work as-is. They mistake a name, skip a necessary procedure, or call a function that doesn't exist. The same thing happens when they write text and invent the title of a book that doesn't exist.

It's not that they became usable because they started producing the correct answer on the first try.

## With code, the machine knows it failed

The difference lies in what happens next.

Programs can be run. If you run them and they are wrong, they stop. When they stop, a text output appears explaining where it stopped. Regardless of the author's intent, the machine itself determines, "This is no good."

Text doesn't have this. Even if you pass a written text to a machine, it cannot tell if it is "correct." Even if the facts are wrong or the logic is inconsistent, there is no problem with it as a string of characters. The operation of "running it to verify" does not exist.

## That is why a loop can be built

When the machine can handle the determination, repetition becomes automated.

Have it write. Run it. If it stops, add the reason for the failure to the next input and have it write again. Run it. If it's still no good, add to it again.

If you cycle this a few times, it will eventually reach a point where it passes. Because it chooses by probability, it won't hit the mark on the first try, but as long as you know it failed, you can just redraw until it hits. A human doesn't need to be watching.

This is exactly what program-writing tools are doing. They have the model write, run it externally, feed the result back, and have it write again. Instead of showing the model's output directly to a human, a machine first receives and inspects it.

The outer layer surrounding the model is called a harness. The job of a harness isn't just to maintain memory. It inspects the output and sends it back if it failed. I believe creating this loop is the core of the system.

## On the side of text, this loop doesn't close

If you try to do the same thing with text, the chain breaks halfway through.

Have it write. That part is fine. Next, there is no operation equivalent to "running it." Who determines the result? There is a method of having another model read and grade it, but that grading is also just a string of characters chosen by probability. Since there is no mechanism to measure truth anywhere in the process, you simply get a grade that *looks* plausible.

Therefore, with text, a human must read it at the end. Until someone reads it, no one knows if it is wrong.

This isn't due to poor tool design. You cannot build an automated loop where there is nothing that can be objectively determined.

## How to tell the difference

I believe this one point determines what can be entrusted and left alone:

Can a machine determine the correctness of the output?

If yes, you can leave it alone. This applies to programs, cases where calculation results can be cross-checked, and cases where you are verifying if something fits a predefined format. If you build a loop that sends it back upon failure, the fact that it fails by probability ceases to be a problem.

If no, you must create a place for a human to receive it. Text, judgments, selection of recipients, whether something is fit for publication. If you build an automated loop here, it will proceed while remaining incorrect. Moreover, the failure won't be apparent on the surface.

## Two types are enough

All they can do is text and images. I think the reason that is sufficient is because programs are contained within text.

Programs can be run. Things that can be run can be tightened into a loop even if they are written by probability. Furthermore, being able to write things that can be run also means being able to write the determination mechanism itself.

I believe that most of what is actually happening right now is the process of turning a machine that fails by probability into a system that does not fail by probability.
