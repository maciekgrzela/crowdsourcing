import {
  action,
  observable,
  runInAction,
  makeObservable,
  computed,
} from 'mobx';
import agent from '../API/agent';
import { history } from '../App';

export default class ExperimentsStore {
  rootStore;

  adjustingSetImages = [
    { image: 'AS-21.jpg', age: 21 },
    { image: 'AS-40.jpg', age: 40 },
    { image: 'AS-46.jpg', age: 46 },
    { image: 'AS-52.jpg', age: 52 },
    { image: 'AS-77.jpg', age: 77 },
  ];

  constructor(rootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @observable conductedExperiment = null;
  @observable experimentGenerated = false;
  @observable errorOccurred = false;
  @observable experiments = [];

  @computed get conductedExperimentFirstImgIndex() {
    return this.conductedExperiment !== null
      ? this.conductedExperiment.results.findIndex((item) => item.label === 0)
      : null;
  }

  @computed get conductedExperimentRenew() {
    return this.conductedExperiment === null
      ? false
      : !(this.conductedExperiment.feedbackForAdjustingSet === 0);
  }

  @computed get timeElapsedFromStart() {
    if (this.conductedExperiment !== null) {
      return this.conductedExperiment.breaks.length > 0
        ? this.conductedExperiment.breaks[
            this.conductedExperiment.breaks.length - 1
          ]
        : 0;
    }

    return null;
  }

  @computed get indexesLabeledCount() {
    if (this.conductedExperiment !== null) {
      return this.conductedExperiment.results.filter((exp) => exp.label !== 0)
        .length;
    }

    return null;
  }

  @computed get indexesAllCount() {
    if (this.conductedExperiment !== null) {
      return this.conductedExperiment.results.length;
    }

    return null;
  }

  @computed get notStartedExperiments() {
    return this.experiments.filter(
      (experiment) => experiment.feedbackForAdjustingSet === 0
    );
  }

  @computed get finishedExperiments() {
    return this.experiments.filter(
      (experiment) => experiment.isValid === false
    );
  }

  @action abandonExperiment = async () => {
    runInAction(() => {
      this.setConductedExperiment(null);
      history.push('/');
    });
  };

  @action verifyExperiment = async (id) => {
    try {
      const experiment = await agent.Experiments.listOne(id);
      if (experiment.isValid) {
        runInAction(() => {
          this.setConductedExperiment(experiment);
        });
      } else {
        history.push('/experiment/invalid');
      }
    } catch (e) {
      history.push('/experiment/invalid');
      console.log(e);
    }
  };

  @action getExperiments = async () => {
    try {
      const experiments = await agent.Experiments.list();
      runInAction(() => {
        this.setExperiments(experiments);
      });
    } catch (e) {
      console.log(e);
    }
  };

  @action downloadExperiments = async () => {
    try {
      const response = await agent.Experiments.download();
      const file = new Blob([response.data]);
      const url = window.URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'experiments.json');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (e) {
      console.log(e);
    }
  };

  @action generateExperiment = async (values) => {
    runInAction(() => {
      this.setExperimentGenerated(false);
      this.setErrorOccurred(false);
    });

    let request = {
      name:
        values.name === undefined || values.name === null ? null : values.name,
      email: values.email,
    };

    try {
      await agent.Experiments.generate(request);
      this.setExperimentGenerated(true);
    } catch (e) {
      this.errorOccurred = true;
    }
  };

  @action generateExperimentFile = async (values) => {
    let request = {
      name:
        values.name === undefined || values.name === null ? null : values.name,
      email: values.email,
    };

    try {
      await agent.Experiments.generate(request);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  @action updateAdjustingInfo = async (data) => {
    try {
      await agent.Experiments.updateAdjustingInfo(
        this.conductedExperiment._id,
        data
      );

      let experiment = this.conductedExperiment;
      experiment.participantAge = data.participantAge;
      experiment.feedbackForAdjustingSet = data.feedbackForAdjustingSet;
      experiment.inputInterface = data.inputInterface;

      runInAction(() => {
        this.setConductedExperiment(experiment);
      });
    } catch (e) {
      console.log(e);
    }
  };

  @action updatePredictions = (resultsIndex, label) => {
    let experiment = this.conductedExperiment;
    let results = this.conductedExperiment.results;

    results[resultsIndex].label = label.value;
    results[resultsIndex].milliseconds = label.milliseconds;
    experiment.results = results;

    this.setConductedExperiment(experiment);
  };

  @action updateResults = async () => {
    try {
      await agent.Experiments.updateResults(
        this.conductedExperiment._id,
        this.conductedExperiment.results
      );
    } catch (e) {
      console.log(e);
    }
  };

  @action finishConductedExperiment = async (experimentBreak, seconds) => {
    try {
      await agent.Experiments.finish(this.conductedExperiment._id, {
        seconds: seconds,
        break: experimentBreak,
      });
      this.setConductedExperiment(null);
    } catch (e) {
      console.log(e);
    }
  };

  @action setExperimentGenerated = (value) => {
    this.experimentGenerated = value;
  };

  @action setErrorOccurred = (value) => {
    this.errorOccurred = value;
  };

  @action setExperiments = (value) => {
    this.experiments = value;
  };

  @action setConductedExperiment = (value) => {
    this.conductedExperiment = value;
  };
}
