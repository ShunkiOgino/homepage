---
title: "Memory is Not the Model's Job"
date: 2026-08-01
description: "Since models remember nothing, everything we call 'memory' is handled by the external layer. Even with the same model, what it can achieve changes depending on that exterior."
tags: ["Until now"]
draft: false
src_hash: 814f4482695a
---

Artificial intelligence that writes text is called a Large Language Model. In English, it's written as LLM for short. OpenAI's GPT, Google's Gemini, and Anthropic's Claude fall into this category. Hereafter, I will refer to them as "models."

These models remember nothing. The reason they seem to remember is that the external layer refills their context every single time.

To begin with, a model cannot be used on its own. It is nothing more than a component that returns a string when passed a string. To make it usable for humans, it requires surrounding programs. A program to display the screen. To receive the text typed by the user. To store the conversation history. To decide what to pass to the model each time. To connect tools for search or file manipulation and execute them according to the model's request.

This surrounding program is called a "harness." The term originally refers to horse tack—not the horse itself, but the equipment attached to harness the horse's power.

The most familiar example is ChatGPT. GPT is the model; ChatGPT is the surrounding harness. Because the names are similar, they look like the same thing, but they exist on different layers. In terms of tools for writing code, Claude Code or Cursor serve this purpose. Even if they are calling the same model, they become different tools if the harness is different.

## What the Harness Does

If you list the tasks of a harness, they look like this:

Deciding what goes into the window. Deciding what to discard when it overflows. Passing a list of tools, receiving the string "use this tool" produced by the model, and actually executing it. Converting the result into a string and sending it back. Reconstructing the next bundle of calls. Pulling relevant information from past records and mixing it in.

In other words, everything called "memory" exists on this side.

Once you understand this, your axis of evaluation changes. "It has a poor memory," "it doesn't follow what I said before," "it gets lost during long tasks." These frustrations seem like questions of the model's intelligence, but in reality, they are often questions of harness design. Even with the same model, behavior changes if the exterior is different.

## The Model is Below, the Harness is Above

What's interesting is that this two-layer relationship seems opposite to the forms we are accustomed to.

Take a smartphone: the hardware is at the bottom, and the OS sits on top. The hardware cannot be replaced, but the OS can be swapped. Therefore, there is a sense that the power lies with the bottom layer.

In artificial intelligence, the arrangement is reversed. The model is the foundation, and the harness that wraps it is on the outside. And it is the exterior that determines the usability.

Looking at it this way, I can understand why large companies want to own both the model and the harness in-house. Because with only one side, the experience is not determined.

Furthermore, for every model, there is always a harness that fits it. Since quirks, window size, and proficiency in using tools differ by model, the "fit" matters.

## A Framework Made by an Individual is Used by Two Million People

There is a framework called Open WebUI. It is a set of tools for entrusting one's work to a model; the internals are fully public, so anyone can read them or modify them for their own use. This method of distribution is called open source.

It was created by an individual named Peter Steinberg. He had spent a long time making components for document-handling software, and after letting that go, he began tinkering with AI tools to organize his own surroundings; this project emerged from that process.

As of April 2026, it has exceeded 300,000 stars on GitHub. GitHub is a place to host and publish programs, and stars are marks left by people who see them. There are two million weekly users. In February 2026, OpenAI hired this person. The framework itself is set to remain open source under a foundation.

While large companies competed to build models, so many people gathered around an external framework built by one person. And then, the side building the models went to recruit that one individual.

## Look at the Exterior

It seems that the place where "lock-in" is effective is shifting from the model to the harness.

Model performance will be caught up with. They are leveled in a matter of months, and prices drop. However, the external tooling digs into the very way people perform their work. Once a workflow is established there, it cannot be easily replaced.

Therefore, before comparing model scores, look at the harness. What is put into the window? What is discarded when it overflows? How is the past retrieved? What is permitted for the tools?

That is where the dividing line lies between merely using it and truly mastering it.
