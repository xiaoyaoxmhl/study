import {helloworld} from './helloworld';

document.write(helloworld())


if (module.hot) {
    console.log('hot...');
    module.hot.accept('./helloworld', function () {
        console.log('Accepting the updated printMe module!');
    })
}