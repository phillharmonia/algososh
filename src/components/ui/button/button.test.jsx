
import { render, screen, fireEvent } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import {Button} from "./button";

describe('Тест Button', () => {
    it('Тест кнопки с текстом', () => {
        const button = TestRenderer.create(<Button text='Кнопка' />).toJSON();
        expect(button).toMatchSnapshot()
    })
    it('Тест кнопки без текста', () => {
		const button = TestRenderer
			.create(<Button />)
			.toJSON()
		expect(button).toMatchSnapshot()
    })
})