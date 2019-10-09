import React from 'react'
import styled from 'styled-components/macro'
import Note from './Note'
import TagFilter from './TagFilter'
import SearchBar from '../SearchBar'
import Page from '../common/Page'
import Header from '../common/Header'
import Navigation from '../app/Navigation'

export default function NotePage({ onSelectTag, notes, tags, selectedTag }) {
  return (
    <Page title={'NotePage'}>
      <Header></Header>
      <Navigation></Navigation>
      <ScrollerStyled>
        <SearchBar></SearchBar>
        <TagFilter
          tags={tags}
          onClick={onSelectTag}
          selectedTag={selectedTag}
        />
        {notes.map(note => (
          <Note
            key={note.title}
            title={note.title}
            date={note.date}
            content={note.content.split('\n').map(line => {
              return <LineBreakStyled>{line}</LineBreakStyled>
            })}
            tag={note.tag}
          />
        ))}
      </ScrollerStyled>
    </Page>
  )
}

const ScrollerStyled = styled.div`
  display: grid;
  gap: 20px;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding: 5px 20px;
  justify-items: center;
`
const LineBreakStyled = styled.p`
  margin: 0px;
`
