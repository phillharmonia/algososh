import TestRenderer from 'react-test-renderer';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

describe('Тест Circle', () => {
    it('Тест Circle без текста', () => {
        const circle = TestRenderer.create(<Circle />).toJSON();
        expect(circle).toMatchSnapshot();
    })
    it('Тест Circle с текстом', () => {
        const circle = TestRenderer.create(<Circle letter='123' />).toJSON();
        expect(circle).toMatchSnapshot();
    })
    it('Тест Circle с head', () => {
        const circle = TestRenderer.create(<Circle head="head" />).toJSON();
        expect(circle).toMatchSnapshot();
    })
    it('Тест Circle в head с React элементом', () => {
        const circle = TestRenderer.create(<Circle head={<Circle />} />).toJSON();
        expect(circle).toMatchSnapshot();
    })
    it('Тест Circle c tail', () => {
        const circle = TestRenderer.create(<Circle tail="tail" />).toJSON();
        expect(circle).toMatchSnapshot();
    })
    it('Тест Circle с индексом', () => {
        const circle = TestRenderer.create(<Circle index={0} />).toJSON();
        expect(circle).toMatchSnapshot();
    })
    it('Тест Circle с пропом isSmall === true', () => {
		const circle = TestRenderer.create(<Circle isSmall={true} />).toJSON()
		expect(circle).toMatchSnapshot()
	})
    it('Тест Circle в состоянии Default', () => {
        const circle = TestRenderer.create(<Circle state={ElementStates.Default} />).toJSON();
        expect(circle).toMatchSnapshot();
    })
    it('Тест Circle в состоянии Changing', () => {
        const circle = TestRenderer.create(<Circle state={ElementStates.Changing} />).toJSON();
        expect(circle).toMatchSnapshot();
    })
    it('Тест Circle в состоянии Modified', () => {
        const circle = TestRenderer.create(<Circle state={ElementStates.Modified} />).toJSON();
        expect(circle).toMatchSnapshot();
    })
})