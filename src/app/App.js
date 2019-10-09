import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import NotePage from '../notes/NotePage'
import CreatePage from '../create/CreatePage'
import { getNotes, postNote } from '../notes/services'

export default function App() {
  const [selectedTag, setSelectedTag] = useState('')
  const [noteList, setNoteList] = useState([])
  useEffect(() => {
    getNotes().then(setNoteList)
  }, [])

  console.log(noteList)

  // const allNoteTags = ['started', 'advanced', 'completed']
  const allNoteTags = Array.from(
    noteList.reduce((prev, note) => {
      prev.add(note.tag)
      return prev
    }, new Set())
  )

  const filteredNotes = noteList.filter(note => note.tag.includes(selectedTag))

  function selectTag(clickedTag) {
    setSelectedTag(clickedTag)
    return selectedTag === clickedTag
      ? setSelectedTag('')
      : setSelectedTag(clickedTag)
  }

  function createNote(newNoteData) {
    postNote(newNoteData).then(note => setNoteList([...noteList, note]))
  }

  return (
    <Router>
      <AppStyled>
        <Route
          path="/"
          exact
          render={() => (
            <NotePage
              tags={allNoteTags}
              onSelectTag={selectTag}
              notes={filteredNotes}
              selectedTag={selectedTag}
            ></NotePage>
          )}
        />
        <Route
          path="/create"
          render={() => (
            <CreatePage
              tags={allNoteTags}
              onSelectTag={selectTag}
              selectedTag={selectedTag}
              onSubmit={createNote}
            ></CreatePage>
          )}
        />
      </AppStyled>
    </Router>
  )
}

const AppStyled = styled.div`
  display: grid;
  grid-template-rows: auto 48px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
`
