class Split {
    constructor(user, amount) {
        this.amount = amount;
        this.user = user;
    }
}

class EqualSplit extends Split {
    constructor(user) {
            super(user, 0);
    }
}

class PercentSplit extends Split {
    constructor(user, percent) {
      super(user, 0);
      this.percent = percent;
      this.user = user;
    }
}

class ExactSplit extends Split {
    constructor(user, amount) {
          super(user, amount);
    }
}

module.exports = {
    Split,
    EqualSplit,
    PercentSplit,
    ExactSplit
};