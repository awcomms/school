import type { Id } from '$lib/types';
import type { ChatCompletionRequestMessage, CreateChatCompletionRequest, CreateCompletionRequest } from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources';

export interface Parameters {
	model: string;
	prompts: string[];
	suffix?: string;
	max_tokens?: number;
	temperature?: number;
	top_p?: number;
	n?: number;
	stream?: boolean;
	logprobs?: number;
	echo?: boolean;
	stop?: string[];
	presence_penalty?: number;
	frequency_penalty?: number;
	best_of?: number;
	logit_bias?: Record<string, number>;
}

export interface Chat {
	id: Id;
	messages: Id[];
	parameters: CreateChatCompletionRequest
}

export interface Description {
	id: Id;
	name: string;
	embedding?: number[];
	text: string;
}

export type Message = ChatCompletionMessageParam & { id: number };
