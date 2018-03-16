
module.exports = {
  "extends": [
    "stylelint-config-standard"
  ],
  "plugins": [
    "stylelint-order",
    "stylelint-scss"
  ],
  "rules": {
    "indentation": 4,
    "at-rule-empty-line-before": ["always", {
      "except": [
        "after-same-name",
        "blockless-after-same-name-blockless",
        "blockless-after-blockless",
        "first-nested"
      ],
      "ignore": ["after-comment", "inside-block"],
      "severity": "warning"
    }],
    "at-rule-no-unknown": [true, {
      "ignoreAtRules": [
        "extend", "each", "for", "if", "else",
        "mixin", "include", "content", "at-root"
        ]
    }],
    "comment-empty-line-before": ["always", {
      "except": ["first-nested"],
      "ignore": ["stylelint-commands", "after-comment"],
      "severity": "warning"
    }],
    "max-empty-lines": 2,
    "number-leading-zero": "always",
    "shorthand-property-no-redundant-values": null,
    "unit-whitelist": ["px", "em", "rem", "%", "s", "vw", "vh"],
    "order/order":  [
      "custom-properties",
      "dollar-variables",
      "declarations",
      "rules"
    ],
    "order/properties-order": null,
    // "scss/at-rule-no-unknown": true
  }
};
