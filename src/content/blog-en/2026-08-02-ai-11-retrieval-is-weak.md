---
title: "Even with Smarter Models, Indexing Doesn't Get Better"
date: 2026-08-02
description: "Asking AI to find documents is the least reliable part. When measured against a ground truth, larger models actually performed worse. Indexing doesn't exist inside the model, so it won't improve just because the model gets smarter."
tags: ["Until Now"]
draft: false
src_hash: 53968cbeeed7
---

Artificial intelligence that writes text is called a Large Language Model. In English, it's written as LLM for short. OpenAI's GPT, Google's Gemini, and Anthropic's Claude fall into this category. Hereafter, I will refer to them as "models."

In my experience, the most unreliable thing you can ask them to do is find documents.

When I ask a model to look into something, it returns something that looks plausible. But it's not what I actually wanted. It bypasses the correct documents I have on hand and brings back something distant and irrelevant.

## Searching Inside the Model is Hopeless to Begin With

First, consider the case where you don't provide external documents and ask the model to answer based on what it remembers. This is useless.

Since a model is simply choosing the most likely next token, if asked for a source, it will generate a string that *looks* like a source. Book titles, authors, and article numbers all appear in a plausible format. Nowhere in the mechanism is it actually verified whether these things exist.

This has become well-known, so most people now know about it. That is why the method of providing your own documents has become the norm.

## Research Feels "Off" Because the Index is Borrowed

There is a similar story closer to home: that subtle sense of inadequacy when you have an AI do research.

First, the model isn't searching the world on its own. ChatGPT's search borrows an external index. For a long time, Microsoft Bing was the primary source, but now it's a mix of its own crawling and multiple providers; it is not disclosed exactly what is being indexed or how.

The process goes like this: It rewrites your question into search terms. It searches with those terms. It looks only at the headings and descriptions of the returned results to decide which ones to open. It reads what it opened. It summarizes the findings and returns them with citations.

The third step is where the problem lies. It filters results based on headings and short descriptions before reading the content. Therefore, even if a page has great content, it will never make it into the answer if its heading is bland. From our perspective, we can't see that a document was dropped.

There is one more thing. According to an analysis of 80 million queries, actual searches are triggered in less than half of the cases; for the rest, the model answers using only its training data. Meanwhile, the user believes a search was performed.

In other words, what determines the quality of the research is the quality of the search index and how it's filtered. The "excellence" lies with the search engine, not the model.

## Providing Documents Leaves the Selection Problem

However, simply providing the documents doesn't solve everything.

There is a limit to the context window, so you can't pass everything. Even if it fits, adding a massive amount of irrelevant material actually degrades accuracy. It's the same as when you ask a human for help.

Therefore, you must select before providing. You extract only the documents from your collection that seem relevant right now and pass those along. This selection process is, in fact, the core of the operation.

And the quality of this selection directly determines the quality of the answer. Documents that are missed during selection do not exist for the model. The model can say nothing about something that doesn't exist.

## Measuring How to Select

There are two main ways to select documents.

One is selecting by the overlap of rare words. This is an old method: words that appear everywhere are weighted lightly, and words that rarely appear are weighted heavily. Documents sharing the same rare words are considered more closely related.

The other is selecting by semantic proximity. Sentences are converted into sequences of numbers (vectors), and those with similar sequences are chosen. Its selling point is the ability to pick up documents that mean the same thing even if the phrasing is different. In general discourse, this is considered the newer and "smarter" approach.

I measured which one was more accurate using my own corpus.

For the ground truth, I used 343 approved links. These are pairs of documents that a human had verified and marked as related. I pitted the two methods against each other to see if one could find the other document given a starting point.

## The Results

I compared them by the percentage of times the correct answer appeared in the top six results.

The rare-word overlap method scored 0.971.

The semantic proximity method scored 0.755.

I also looked at the nature of the difference. There were zero pairs that only the semantic method placed in the top six. Conversely, there were between 74 and 95 pairs that only the rare-word method caught. The situation where one picked it up and the other dropped it happened in only one direction.

It even lost in scenarios where it should have excelled. I tested the ability to find paraphrases—pairs that wrote the same thing in different words. In the top three results, the rare-word method scored 0.954, while the semantic method scored 0.792.

## Larger Models Made it Worse

I tested the semantic method with two different model sizes. The smaller one scored 0.755, and the larger one scored 0.694.

The larger one was worse.

Since this is a single comparison, I don't intend to call it a law. However, at the very least, "making it larger makes it better" did not happen. Nor do I see any prospect that bringing in an even larger model would reverse this.

Furthermore, the winning method didn't use a single model. It was just simple arithmetic—weighting rare words—that existed long before machine learning. A method with zero "intelligence" beat two models.

## Disclosing Unfavorable Conditions

There is a bias in this experiment that favors my results.

The links used as ground truth were originally generated by rare-word overlap and then approved by a human. Therefore, the playing field is naturally biased toward that method.

However, even accounting for that, the conclusion doesn't change. Even on a biased playing field, the semantic method didn't add a single correct result. "Zero" is significant in that sense. There was no evidence to support the idea of combining both methods.

## Why This Happened

The reason lies in the nature of the corpus.

What I wanted to find was the relationship: "This is a continuation of the same task." The signature of this relationship wasn't semantic proximity, but the sharing of rare proper nouns—the same tool name, the same project name. Two records that have no semantic relationship become a correct pair solely because they share that one word.

Another point: the documents on hand were written by the same author using consistent language. The problem of paraphrasing was minimal to begin with. Semantic search shines when authors are diverse and write the same thing using different words.

## The Index is Not Inside the Model

This is the main point I want to make.

The mechanism of *what* to search for and *how* to search for it is not inside the model. The model is a component that receives strings and returns strings; the way documents are organized and the rules for which ones become candidates exist on the outside.

Therefore, even if the model gets smarter, indexing does not get better. It is a separate component located elsewhere.

This also means it's not the kind of problem that will be solved just by waiting. The ability to write text and code has improved visibly over the past year. But as for searching, unless we change the design ourselves, it will continue to miss the mark with the same accuracy as last year.

Moreover, which method works depends on the nature of your documents: who wrote them, whether the vocabulary is consistent, and what kind of relationship you are looking for. Because the answer changes based on these factors, it cannot be decided by general theory.

The only way is to measure. Create a few dozen ground-truth pairs by hand and see where the correct answer ranks among the candidates. It's a task that can be finished in half a day.

When I say that asking AI to find documents is useless, I'm not saying the model is stupid. I'm saying that nobody has designed the index.
