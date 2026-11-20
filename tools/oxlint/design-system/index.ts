import { defineRule, eslintCompatPlugin } from "@oxlint/plugins"

const LANDING_CLASS =
  /^(?:bg|text|border|ring|fill|stroke|outline|decoration|from|via|to|shadow|divide|placeholder|caret|accent)-(?:forest|ink|cream|lime|sun|coral)(?:\/[\d.]+)?$|^font-(?:display|hand)$/

function findLandingClass(text: string): string | undefined {
  return text
    .split(/[\s"'`]+/)
    .map((token) => token.slice(token.lastIndexOf(":") + 1))
    .find((utility) => LANDING_CLASS.test(utility))
}

/** Keep the landing's palette and fonts inside the landing; the aplicação paints with its own tokens. */
const noLandingTokensRule = defineRule({
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow landing-only classes outside src/app/(app)/; see docs/design.md.",
    },
    messages: {
      landingToken:
        "`{{utility}}` belongs to the landing. Use the aplicação tokens from docs/app.md (chrome, grade-*, primary, foreground).",
    },
  },
  createOnce(context) {
    return {
      Literal(node) {
        const utility = findLandingClass(node.raw ?? "")

        if (utility) context.report({ node, messageId: "landingToken", data: { utility } })
      },
      TemplateElement(node) {
        const utility = findLandingClass(node.value.raw)

        if (utility) context.report({ node, messageId: "landingToken", data: { utility } })
      },
    }
  },
})

const designSystemPlugin = eslintCompatPlugin({
  meta: { name: "design-system" },
  rules: { "no-landing-tokens": noLandingTokensRule },
})

export default designSystemPlugin
