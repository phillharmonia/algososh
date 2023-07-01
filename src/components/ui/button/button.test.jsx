import { render, screen, fireEvent } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import {Button} from "./button";

describe('Тест Button', () => {
    it('Тест кнопки с текстом', () => {
        const button = TestRenderer.create(<Button text='Кнопка' />).toJSON();
        expect(button).toMatchSnapshot()
    })
    it('Тест кнопки без текста', () => {
		const button = TestRenderer.create(<Button />).toJSON()
		expect(button).toMatchSnapshot()
    })
    it('Тест с заблокированной кнопкой', () => {
      const button = TestRenderer.create(<Button disalbed />).toJSON()
		expect(button).toMatchSnapshot()
    })
    it('Тест с загрузкой', () => {
      const button = TestRenderer.create(<Button isLoader={true} />).toJSON()
		expect(button).toMatchSnapshot()
    })
    it('Тест корректности вызова коллбека при нажатии на кнопку', () => {
      window.alert = jest.fn();

		render(<Button text='Тест' onClick={() => { alert('test success') }} />)

		const button = screen.getByText('Тест');
		fireEvent.click(button);

		expect(window.alert).toHaveBeenCalledWith('test success');
    })
})