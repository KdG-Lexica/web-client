const query =
  [
    {
      combinator: "AND",
      rules: [
        {
          field: "author",
          operator: "CONTAINS",
          value: "quinten",
        },
        {
          field: "source",
          operator: "IS_NOT_EMPTY",
          value: "",
        },
      ],
    },
    {
      combinator: "OR",
      rules: [
        {
          field: "author",
          operator: "CONTAINS",
          value: "quinten",
        },
        {
          field: "source",
          operator: "IS_NOT_EMPTY",
          value: "",
        },
      ],
    }
  ]
