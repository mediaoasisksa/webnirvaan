export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: 'outreach' | 'follow-up' | 'nurture' | 'closing';
  tags: string[];
}

export const emailTemplates: EmailTemplate[] = [
  {
    id: 'outreach-1',
    name: 'Initial Outreach - Problem-Solution',
    subject: 'Quick question about {{company}} website',
    body: `Hi {{firstName}},

I noticed {{company}} is in the {{industry}} space. Many businesses in your industry struggle with {{problem}} - does this resonate?

We've helped similar companies like {{similarCompany}} increase their online revenue by {{metric}}% by {{solution}}.

Would you be open to a quick 15-minute call to discuss how we might help {{company}} achieve similar results?

Best regards,
{{yourName}}
WebNirvaan`,
    category: 'outreach',
    tags: ['initial', 'problem-solution', 'value-proposition'],
  },
  {
    id: 'outreach-2',
    name: 'Initial Outreach - Case Study',
    subject: 'How {{similarCompany}} increased revenue by {{metric}}%',
    body: `Hi {{firstName}},

I thought you might find this interesting: we recently helped {{similarCompany}} (also in {{industry}}) increase their online revenue by {{metric}}% in just {{timeframe}}.

The key was {{solution}} - something that could work well for {{company}} too.

Would you be interested in seeing the full case study? I can send it over or we can jump on a quick call.

Best,
{{yourName}}
WebNirvaan`,
    category: 'outreach',
    tags: ['initial', 'case-study', 'social-proof'],
  },
  {
    id: 'follow-up-1',
    name: 'Follow-up - No Response (7 days)',
    subject: 'Re: {{originalSubject}}',
    body: `Hi {{firstName}},

I wanted to follow up on my previous email about {{topic}}.

I know you're busy, so I'll keep this short: would a {{timeframe}}-minute call work to discuss how we've helped companies like {{company}} achieve {{outcome}}?

If not, no worries - just let me know if you'd prefer I reach out at a different time.

Best,
{{yourName}}`,
    category: 'follow-up',
    tags: ['follow-up', 'soft-close', 'respectful'],
  },
  {
    id: 'follow-up-2',
    name: 'Follow-up - Value Add',
    subject: 'Quick tip for {{company}}',
    body: `Hi {{firstName}},

I wanted to share something that might be helpful for {{company}}:

{{valueTip}}

This is something we've implemented for clients with great results. If you'd like to discuss how it could work for {{company}}, I'm happy to chat.

Best,
{{yourName}}
WebNirvaan`,
    category: 'follow-up',
    tags: ['follow-up', 'value-add', 'helpful'],
  },
  {
    id: 'nurture-1',
    name: 'Nurture - Educational Content',
    subject: '{{topic}} - might be useful for {{company}}',
    body: `Hi {{firstName}},

I came across this article about {{topic}} and thought it might be relevant for {{company}}:

{{articleLink}}

We've seen similar challenges with our clients, and {{insight}}.

If you'd like to discuss how this applies to your business, I'm here to help.

Best,
{{yourName}}`,
    category: 'nurture',
    tags: ['nurture', 'educational', 'helpful'],
  },
  {
    id: 'closing-1',
    name: 'Closing - Urgency',
    subject: 'Last chance: {{offer}}',
    body: `Hi {{firstName}},

I wanted to reach out one more time about {{offer}}.

We're currently booking projects for {{timeframe}}, and I wanted to make sure {{company}} doesn't miss out on {{benefit}}.

Would you be available for a quick call this week to discuss?

Best,
{{yourName}}
WebNirvaan`,
    category: 'closing',
    tags: ['closing', 'urgency', 'final-attempt'],
  },
];

export function getTemplateById(id: string): EmailTemplate | undefined {
  return emailTemplates.find(t => t.id === id);
}

export function getTemplatesByCategory(category: EmailTemplate['category']): EmailTemplate[] {
  return emailTemplates.filter(t => t.category === category);
}

export function replacePlaceholders(template: string, data: Record<string, string>): string {
  let result = template;
  Object.entries(data).forEach(([key, value]) => {
    result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
  });
  return result;
}

