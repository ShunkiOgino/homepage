---
title: "What Kind of Work Can Be Entrusted to AI"
date: 2026-08-02
description: "Whether a task can be entrusted depends on three questions: Is it in a format that can be sequenced? Is the answer contained within the provided input? Can the machine determine if it has failed? All of these stem from the underlying mechanism."
tags: ["Until Now"]
draft: false
src_hash: 89d80138c22b
---

Artificial intelligence that writes text is called a Large Language Model. In English, it's written as LLM. OpenAI's GPT, Google's Gemini, and Anthropic's Claude fall into this category. Hereafter, I will refer to them as "models."

When considering whether a specific job can be entrusted to AI, having a list of "tasks it can do" is useless. Such lists become obsolete in six months, and they are useless when a task comes along that isn't on the list.

Instead, I ask three questions. Each of these is a question derived from the mechanism of the machine.

## 1. Is the desired output in a format that can be sequenced?

All a model can do is select and sequence the most probable next element. Therefore, it can produce anything that exists in a sequenced format.

Text can be sequenced. Programs can also be sequenced because they are essentially text with strict rules. Images are the same in that they are determined by probability, though the procedure differs.

What cannot be sequenced are procedures that maintain an internal state throughout a process. Remembering a carry-over in digits to add it next. Counting things up. Processing items in a specific order. Because these operations do not exist within the mechanism, the model fails at four-digit multiplication.

This isn't a matter of "it will be solved once a smarter model comes along." The operation itself is not present.

## 2. Is the answer contained within what was provided?

What a model sees is only the string of characters passed to it in that single instance. Nothing outside of that exists.

Therefore, the model is strong if the answer is within what was provided. In translation, the answer is inside the original text. Summarization, rewriting, classification, and sorting are the same; we provide all the materials. Since it becomes a job of rearranging, it often hits the mark.

If the answer is not in what was provided, the model suddenly becomes weak. Fact-checking, identifying sources, latest information. What happens here is that instead of saying it doesn't exist, the model creates something that *looks* plausible. This is because the operation "stop if it's not there" is not built into the mechanism.

The solution is to become the party that provides the answer. Paste the documents first. Have it fetch search results. Let it read a ledger. In short, turn the answer to the second question into a "yes" before making the request.

## 3. Can the machine determine if it has failed?

Because it selects based on probability, it will fail. The problem is whether it knows that it has failed.

With programs, it's clear. If you run it and it stops, the reason for the stop is output in text. Therefore, a loop can be built: have it write, run it, feed the failure back in, and have it write again. A human doesn't need to watch. Tools that write programs can be left alone not because they are smart, but because this loop closes.

With text, it's not clear. Even if the facts are wrong or the logic is inconsistent, there is no problem as a string of characters. There is an option to have another model grade it, but since that grading is also a string selected by probability, it simply produces a plausible score.

Therefore, on the text side, a human must read it at the end.

## Determined by the combination of three

When you line them up, it looks like this:

If all three are "yes," you can entrust the task and leave it alone. This is the case for tasks where you provide specifications and have a program written; this is currently where the most progress is being made.

If one and two are "yes" but three is "no," you can let it do the work, but a human must read it. Creating minutes from a recording, summarizing long documents, drafting email replies. We provide the materials and the output looks correct, but the machine doesn't know if it actually is.

If one is "yes" but two is "no," you must first build a mechanism to provide the answer. Research falls here; the design of the search portion directly determines the quality of the answer.

If one is "no," do not let the model do it. Calculation, sorting, and counting fall into this category. Instead, have it write a program that performs those tasks and then execute it. Tasks where one is "no" are converted into tasks where one is "yes" before being passed along.

## These three last longer than a list

A list becomes obsolete quickly, but I believe these three will remain unchanged for some time. This is because they stem from the mechanism.

When a new feature emerges, try applying these three questions to it. Usually, it's realized because one of them changed to a "yes." Tools became connected because the second question became a "yes," and automatic fixing became possible because the third became a "yes."

And for things where one is "no," nothing will change on the model's side. Those must simply be handled externally.
