---
title: "The reason I can write code is that code is text"
date: 2026-08-02
description: "Since my origins are as a translator, it's only natural that I'm good at writing. Programs are also text in a broad sense, so I'm good at those too. Images can be created via probability as well. Conversely, that is all I can do."
tags: ["Until now"]
draft: false
src_hash: 6c3d4bd9cba7
---

An artificial intelligence that writes text is called a Large Language Model. In English, it's written as LLM for short. OpenAI's GPT, Google's Gemini, and Anthropic's Claude fall into this category. Hereafter, I will refer to them as "models."

Models are good at writing text. This is obvious, as they were originally created for translation.

Where it becomes confusing is what comes after that. Why can they also write programs?

## Programs are also text

A programming language is a notation created for humans to read and write. There are words, there are rules for how to arrange them, and they are read from top to bottom.

From the model's perspective, this is no different from Japanese. It assigns probabilities to the symbols most likely to come next and picks one. It repeats this process. It does not distinguish between whether it is constructing a sentence or constructing a program.

Moreover, programs are easier. This is because the rules are stricter than in Japanese, and there are fewer acceptable forms to write. If there is an opening parenthesis here, a closing parenthesis must appear somewhere eventually. The things that can follow this specific command are limited. The narrower the options, the easier it is to guess what comes next.

Therefore, if you interpret the ability to write code as evidence of intelligence, you are mistaken. While it may seem like a high-level category of human work, for the model, it is simply text with strict rules.

I once had a model write a program to create diagrams overnight. The reason it was fast wasn't because the model was brilliant, but because what I asked it to write was text.

## Images are also arranged by probability

Models can produce images too. The mechanism is slightly different; it starts with noise like static on a TV and gradually shapes it into a form. The procedure is different from adding characters one by one.

However, the point that it is decided by probability remains the same. That is why the same quirks appear.

If you give the same instruction twice, you get different pictures. Sometimes the number of fingers is wrong. The text on a sign becomes illegible. All of this can be explained as the result of continuing to choose what seemed most likely to come next. It is not that a skilled painter made a mistake.

## Conversely, that is all I can do

This is the main point.

All a model can do is arrange things by probability. It can handle things that exist in a form that can be arranged, and it cannot handle things that do not.

This is not a matter of intelligence; it is a matter of structure.

For example, the requirement that the same input must always return the same output. This exists outside the mechanism of arrangement. As long as it is choosing by probability, re-selection will occur.

For example, the guarantee that it won't output a value not present in the source material. The behavior of "stopping if it isn't there" does not exist within the mechanism. A number that seems likely to come next can be calculated even if there is no source material.

For example, actually executing something. Searching or opening a file is done by an external program. All the model produces is a string of text saying, "Use this tool."

None of these three are the kind of problems that will be solved simply by a "smarter" model emerging. This is because they lie outside the action of arranging.

## Misreading the axis of intelligence

I think they seem intelligent because the things that can be arranged by probability occupy a considerable portion of human work. Writing, translation, summarization, drafting, programming, art. When you list them out, it looks like reasonably human work.

Even so, the scope of what they can do is fixed there. The room for growth is in the *proficiency*, not in the *category* of tasks.

Therefore, when considering whether a task can be delegated to a model, you are mistaken if you judge it by whether the task is "difficult" or "easy." You must judge it by whether it exists in a form that can be arranged.

And the parts that cannot be arranged must be assembled by humans on the outside.
