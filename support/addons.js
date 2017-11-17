const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiImmutable = require('chai-immutable');
const chaiSorted = require('chai-sorted');
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const sinonChai = require("sinon-chai");

chai.use(chaiAsPromised);
chai.use(chaiImmutable);
chai.use(chaiSorted);
chai.use(sinonChai);

Enzyme.configure({ adapter: new Adapter() });
